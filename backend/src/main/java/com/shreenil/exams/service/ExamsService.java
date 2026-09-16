package com.shreenil.exams.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.exams.domain.StudentGradeRecord;
import com.shreenil.exams.dto.GradeRecordResponse;
import com.shreenil.exams.dto.ReportCardResponse;
import com.shreenil.exams.repository.StudentGradeRecordRepository;
import com.shreenil.profile.domain.StudentProfile;
import com.shreenil.profile.service.StudentProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamsService {
    private static final Logger log = LoggerFactory.getLogger(ExamsService.class);


    private final StudentGradeRecordRepository gradeRecordRepository;
    private final StudentProfileService studentProfileService;

    public ExamsService(StudentGradeRecordRepository gradeRecordRepository,
                             StudentProfileService studentProfileService) {
        this.gradeRecordRepository = gradeRecordRepository;
        this.studentProfileService = studentProfileService;
    }


    @Transactional(readOnly = true)
    public ReportCardResponse getStudentReportCard() {
        StudentProfile student = studentProfileService.getCurrentStudentProfile();
        List<StudentGradeRecord> records = gradeRecordRepository.findByStudentProfileId(student.getId());

        List<GradeRecordResponse> detailedAssessments = records.stream()
                .map(this::mapToGradeRecordResponse)
                .collect(Collectors.toList());

        List<GradeRecordResponse> courseGrades = records.stream()
                .filter(r -> "Final Evaluation".equalsIgnoreCase(r.getAssessmentName()) || r.getExam() != null)
                .map(this::mapToGradeRecordResponse)
                .collect(Collectors.toList());

        if (courseGrades.isEmpty()) {
            courseGrades = detailedAssessments;
        }

        BigDecimal semesterGpa = student.getCumulativeGpa() != null ? student.getCumulativeGpa() : BigDecimal.valueOf(8.92);
        BigDecimal totalCredits = BigDecimal.valueOf(22.0);

        return ReportCardResponse.builder()
                .studentId(student.getId())
                .studentName(student.getUser().getFirstName() + " " + student.getUser().getLastName())
                .enrollmentNumber(student.getEnrollmentNumber())
                .programName(student.getProgram() != null ? student.getProgram().getName() : "B.Tech CSE (AI)")
                .semesterNumber(student.getCurrentSemester())
                .academicYear(student.getCurrentAcademicYear())
                .semesterGpa(semesterGpa)
                .cumulativeGpa(student.getCumulativeGpa())
                .totalCreditsEarned(totalCredits)
                .courseGrades(courseGrades)
                .detailedAssessments(detailedAssessments)
                .build();
    }

    private GradeRecordResponse mapToGradeRecordResponse(StudentGradeRecord r) {
        BigDecimal percentage = r.getMaxMarks().compareTo(BigDecimal.ZERO) > 0
                ? r.getMarksObtained().divide(r.getMaxMarks(), 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100)).setScale(1, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return GradeRecordResponse.builder()
                .id(r.getId())
                .courseId(r.getCourse() != null ? r.getCourse().getId() : null)
                .courseCode(r.getCourse() != null ? r.getCourse().getCourseCode() : "N/A")
                .courseTitle(r.getCourse() != null ? r.getCourse().getTitle() : "Course")
                .assessmentName(r.getAssessmentName())
                .marksObtained(r.getMarksObtained())
                .maxMarks(r.getMaxMarks())
                .percentage(percentage)
                .letterGrade(r.getLetterGrade())
                .gradePoints(r.getGradePoints())
                .semesterNumber(r.getSemesterNumber())
                .teacherRemarks(r.getTeacherRemarks())
                .build();
    }
}
