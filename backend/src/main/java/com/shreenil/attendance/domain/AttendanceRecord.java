package com.shreenil.attendance.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import com.shreenil.profile.domain.StudentProfile;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance_records")
public class AttendanceRecord extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(nullable = false, length = 20)
    private String status; // PRESENT, ABSENT, LATE, EXCUSED

    @Column(length = 255)
    private String remarks;

    public AttendanceRecord() {}

    public AttendanceRecord(String id, StudentProfile studentProfile, Course course, LocalDate attendanceDate, String status, String remarks) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.course = course;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.remarks = remarks;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public StudentProfile getStudentProfile() {
        return this.studentProfile;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDate getAttendanceDate() {
        return this.attendanceDate;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return this.remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public static AttendanceRecordBuilder builder() {
        return new AttendanceRecordBuilder();
    }

    public static class AttendanceRecordBuilder {
        private String id;
        private StudentProfile studentProfile;
        private Course course;
        private LocalDate attendanceDate;
        private String status;
        private String remarks;

        public AttendanceRecordBuilder() {}

        public AttendanceRecordBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AttendanceRecordBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public AttendanceRecordBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public AttendanceRecordBuilder attendanceDate(LocalDate attendanceDate) {
            this.attendanceDate = attendanceDate;
            return this;
        }

        public AttendanceRecordBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AttendanceRecordBuilder remarks(String remarks) {
            this.remarks = remarks;
            return this;
        }

        public AttendanceRecord build() {
            AttendanceRecord instance = new AttendanceRecord();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.course = this.course;
            instance.attendanceDate = this.attendanceDate;
            instance.status = this.status;
            instance.remarks = this.remarks;
            return instance;
        }
    }
}
