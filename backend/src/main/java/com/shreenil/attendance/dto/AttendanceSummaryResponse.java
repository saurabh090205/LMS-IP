package com.shreenil.attendance.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class AttendanceSummaryResponse {
    private BigDecimal overallPercentage;
    private Integer totalClasses;
    private Integer presentCount;
    private Integer absentCount;
    private Integer lateCount;
    private Integer excusedCount;
    private Map<String, BigDecimal> courseWisePercentage;
    private List<AttendanceRecordResponse> records;

    public AttendanceSummaryResponse() {}

    public AttendanceSummaryResponse(BigDecimal overallPercentage, Integer totalClasses, Integer presentCount, Integer absentCount, Integer lateCount, Integer excusedCount, Map<String, BigDecimal> courseWisePercentage, List<AttendanceRecordResponse> records) {
        this.overallPercentage = overallPercentage;
        this.totalClasses = totalClasses;
        this.presentCount = presentCount;
        this.absentCount = absentCount;
        this.lateCount = lateCount;
        this.excusedCount = excusedCount;
        this.courseWisePercentage = courseWisePercentage;
        this.records = records;
    }

    public BigDecimal getOverallPercentage() {
        return this.overallPercentage;
    }

    public void setOverallPercentage(BigDecimal overallPercentage) {
        this.overallPercentage = overallPercentage;
    }

    public Integer getTotalClasses() {
        return this.totalClasses;
    }

    public void setTotalClasses(Integer totalClasses) {
        this.totalClasses = totalClasses;
    }

    public Integer getPresentCount() {
        return this.presentCount;
    }

    public void setPresentCount(Integer presentCount) {
        this.presentCount = presentCount;
    }

    public Integer getAbsentCount() {
        return this.absentCount;
    }

    public void setAbsentCount(Integer absentCount) {
        this.absentCount = absentCount;
    }

    public Integer getLateCount() {
        return this.lateCount;
    }

    public void setLateCount(Integer lateCount) {
        this.lateCount = lateCount;
    }

    public Integer getExcusedCount() {
        return this.excusedCount;
    }

    public void setExcusedCount(Integer excusedCount) {
        this.excusedCount = excusedCount;
    }

    public Map<String, BigDecimal> getCourseWisePercentage() {
        return this.courseWisePercentage;
    }

    public void setCourseWisePercentage(Map<String, BigDecimal> courseWisePercentage) {
        this.courseWisePercentage = courseWisePercentage;
    }

    public List<AttendanceRecordResponse> getRecords() {
        return this.records;
    }

    public void setRecords(List<AttendanceRecordResponse> records) {
        this.records = records;
    }

    public static AttendanceSummaryResponseBuilder builder() {
        return new AttendanceSummaryResponseBuilder();
    }

    public static class AttendanceSummaryResponseBuilder {
        private BigDecimal overallPercentage;
        private Integer totalClasses;
        private Integer presentCount;
        private Integer absentCount;
        private Integer lateCount;
        private Integer excusedCount;
        private Map<String, BigDecimal> courseWisePercentage;
        private List<AttendanceRecordResponse> records;

        public AttendanceSummaryResponseBuilder() {}

        public AttendanceSummaryResponseBuilder overallPercentage(BigDecimal overallPercentage) {
            this.overallPercentage = overallPercentage;
            return this;
        }

        public AttendanceSummaryResponseBuilder totalClasses(Integer totalClasses) {
            this.totalClasses = totalClasses;
            return this;
        }

        public AttendanceSummaryResponseBuilder presentCount(Integer presentCount) {
            this.presentCount = presentCount;
            return this;
        }

        public AttendanceSummaryResponseBuilder absentCount(Integer absentCount) {
            this.absentCount = absentCount;
            return this;
        }

        public AttendanceSummaryResponseBuilder lateCount(Integer lateCount) {
            this.lateCount = lateCount;
            return this;
        }

        public AttendanceSummaryResponseBuilder excusedCount(Integer excusedCount) {
            this.excusedCount = excusedCount;
            return this;
        }

        public AttendanceSummaryResponseBuilder courseWisePercentage(Map<String, BigDecimal> courseWisePercentage) {
            this.courseWisePercentage = courseWisePercentage;
            return this;
        }

        public AttendanceSummaryResponseBuilder records(List<AttendanceRecordResponse> records) {
            this.records = records;
            return this;
        }

        public AttendanceSummaryResponse build() {
            AttendanceSummaryResponse instance = new AttendanceSummaryResponse();
            instance.overallPercentage = this.overallPercentage;
            instance.totalClasses = this.totalClasses;
            instance.presentCount = this.presentCount;
            instance.absentCount = this.absentCount;
            instance.lateCount = this.lateCount;
            instance.excusedCount = this.excusedCount;
            instance.courseWisePercentage = this.courseWisePercentage;
            instance.records = this.records;
            return instance;
        }
    }
}
