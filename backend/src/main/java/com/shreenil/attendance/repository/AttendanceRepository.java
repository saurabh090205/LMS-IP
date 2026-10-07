package com.shreenil.attendance.repository;

import com.shreenil.attendance.domain.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceRecord, String> {
    List<AttendanceRecord> findByStudentProfileIdOrderByAttendanceDateDesc(String studentProfileId);
    List<AttendanceRecord> findByStudentProfileIdAndAttendanceDateBetween(
            String studentProfileId, LocalDate startDate, LocalDate endDate);
    List<AttendanceRecord> findByCourseId(String courseId);
    List<AttendanceRecord> findByCourseIdAndAttendanceDate(String courseId, LocalDate attendanceDate);
    java.util.Optional<AttendanceRecord> findByCourseIdAndStudentProfileIdAndAttendanceDate(
            String courseId, String studentProfileId, LocalDate attendanceDate);
}
