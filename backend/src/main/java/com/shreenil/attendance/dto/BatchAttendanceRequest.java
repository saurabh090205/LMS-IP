package com.shreenil.attendance.dto;

import java.time.LocalDate;
import java.util.List;

public class BatchAttendanceRequest {
    private String courseId;
    private LocalDate attendanceDate;
    private List<AttendanceEntry> entries;

    public BatchAttendanceRequest() {}

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }

    public List<AttendanceEntry> getEntries() { return entries; }
    public void setEntries(List<AttendanceEntry> entries) { this.entries = entries; }

    public static class AttendanceEntry {
        private String studentProfileId;
        private String status;
        private String remarks;

        public AttendanceEntry() {}

        public String getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }
    }
}
