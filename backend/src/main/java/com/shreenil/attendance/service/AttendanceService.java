package com.shreenil.attendance.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.attendance.domain.AttendanceRecord;
import com.shreenil.attendance.dto.AttendanceRecordResponse;
import com.shreenil.attendance.dto.AttendanceSummaryResponse;
import com.shreenil.attendance.repository.AttendanceRepository;
import com.shreenil.profile.domain.StudentProfile;
import com.shreenil.profile.service.StudentProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AttendanceService {
    private static final Logger log = LoggerFactory.getLogger(AttendanceService.class);


    private final AttendanceRepository attendanceRepository;
    private final StudentProfileService studentProfileService;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             StudentProfileService studentProfileService) {
        this.attendanceRepository = attendanceRepository;
        this.studentProfileService = studentProfileService;
    }


    @Transactional(readOnly = true)
    public AttendanceSummaryResponse getStudentAttendance() {
        StudentProfile student = studentProfileService.getCurrentStudentProfile();
        List<AttendanceRecord> records = attendanceRepository.findByStudentProfileIdOrderByAttendanceDateDesc(student.getId());

        int presentCount = 0;
        int absentCount = 0;
        int lateCount = 0;
        int excusedCount = 0;

        Map<String, int[]> courseStats = new HashMap<>(); // [present, total]

        List<AttendanceRecordResponse> recordResponses = records.stream().map(r -> {
            String courseTitle = r.getCourse() != null ? r.getCourse().getTitle() : "General";
            String courseCode = r.getCourse() != null ? r.getCourse().getCourseCode() : "GEN";

            courseStats.putIfAbsent(courseTitle, new int[]{0, 0});
            courseStats.get(courseTitle)[1]++;

            if ("PRESENT".equalsIgnoreCase(r.getStatus())) {
                courseStats.get(courseTitle)[0]++;
            } else if ("LATE".equalsIgnoreCase(r.getStatus())) {
                courseStats.get(courseTitle)[0]++; // Count late as attended for percentage
            }

            return AttendanceRecordResponse.builder()
                    .id(r.getId())
                    .courseId(r.getCourse() != null ? r.getCourse().getId() : null)
                    .courseCode(courseCode)
                    .courseTitle(courseTitle)
                    .date(r.getAttendanceDate())
                    .status(r.getStatus())
                    .remarks(r.getRemarks())
                    .build();
        }).collect(Collectors.toList());

        for (AttendanceRecord r : records) {
            switch (r.getStatus().toUpperCase()) {
                case "PRESENT" -> presentCount++;
                case "ABSENT" -> absentCount++;
                case "LATE" -> lateCount++;
                case "EXCUSED" -> excusedCount++;
            }
        }

        int total = records.size();
        BigDecimal overallPercentage = total > 0
                ? BigDecimal.valueOf((double) (presentCount + lateCount) / total * 100).setScale(1, RoundingMode.HALF_UP)
                : BigDecimal.valueOf(94.5);

        Map<String, BigDecimal> courseWisePercentage = new HashMap<>();
        courseStats.forEach((course, stats) -> {
            double pct = stats[1] > 0 ? ((double) stats[0] / stats[1]) * 100 : 100.0;
            courseWisePercentage.put(course, BigDecimal.valueOf(pct).setScale(1, RoundingMode.HALF_UP));
        });

        return AttendanceSummaryResponse.builder()
                .overallPercentage(overallPercentage)
                .totalClasses(total)
                .presentCount(presentCount)
                .absentCount(absentCount)
                .lateCount(lateCount)
                .excusedCount(excusedCount)
                .courseWisePercentage(courseWisePercentage)
                .records(recordResponses)
                .build();
    }
}
