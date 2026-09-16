package com.shreenil.classroom.dto;

import java.time.LocalDate;

public class RecordedLectureResponse {
    private String id;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String unitId;
    private String unitTitle;
    private String title;
    private String videoUrl;
    private Integer durationMinutes;
    private LocalDate recordedDate;
    private String instructorName;
    private String summaryNotes;

    public RecordedLectureResponse() {}

    public RecordedLectureResponse(String id, String courseId, String courseCode, String courseTitle, String unitId, String unitTitle, String title, String videoUrl, Integer durationMinutes, LocalDate recordedDate, String instructorName, String summaryNotes) {
        this.id = id;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.unitId = unitId;
        this.unitTitle = unitTitle;
        this.title = title;
        this.videoUrl = videoUrl;
        this.durationMinutes = durationMinutes;
        this.recordedDate = recordedDate;
        this.instructorName = instructorName;
        this.summaryNotes = summaryNotes;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseId() {
        return this.courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseCode() {
        return this.courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseTitle() {
        return this.courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getUnitId() {
        return this.unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getUnitTitle() {
        return this.unitTitle;
    }

    public void setUnitTitle(String unitTitle) {
        this.unitTitle = unitTitle;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideoUrl() {
        return this.videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Integer getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public LocalDate getRecordedDate() {
        return this.recordedDate;
    }

    public void setRecordedDate(LocalDate recordedDate) {
        this.recordedDate = recordedDate;
    }

    public String getInstructorName() {
        return this.instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public String getSummaryNotes() {
        return this.summaryNotes;
    }

    public void setSummaryNotes(String summaryNotes) {
        this.summaryNotes = summaryNotes;
    }

    public static RecordedLectureResponseBuilder builder() {
        return new RecordedLectureResponseBuilder();
    }

    public static class RecordedLectureResponseBuilder {
        private String id;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String unitId;
        private String unitTitle;
        private String title;
        private String videoUrl;
        private Integer durationMinutes;
        private LocalDate recordedDate;
        private String instructorName;
        private String summaryNotes;

        public RecordedLectureResponseBuilder() {}

        public RecordedLectureResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public RecordedLectureResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public RecordedLectureResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public RecordedLectureResponseBuilder courseTitle(String courseTitle) {
            this.courseTitle = courseTitle;
            return this;
        }

        public RecordedLectureResponseBuilder unitId(String unitId) {
            this.unitId = unitId;
            return this;
        }

        public RecordedLectureResponseBuilder unitTitle(String unitTitle) {
            this.unitTitle = unitTitle;
            return this;
        }

        public RecordedLectureResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public RecordedLectureResponseBuilder videoUrl(String videoUrl) {
            this.videoUrl = videoUrl;
            return this;
        }

        public RecordedLectureResponseBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public RecordedLectureResponseBuilder recordedDate(LocalDate recordedDate) {
            this.recordedDate = recordedDate;
            return this;
        }

        public RecordedLectureResponseBuilder instructorName(String instructorName) {
            this.instructorName = instructorName;
            return this;
        }

        public RecordedLectureResponseBuilder summaryNotes(String summaryNotes) {
            this.summaryNotes = summaryNotes;
            return this;
        }

        public RecordedLectureResponse build() {
            RecordedLectureResponse instance = new RecordedLectureResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.courseTitle = this.courseTitle;
            instance.unitId = this.unitId;
            instance.unitTitle = this.unitTitle;
            instance.title = this.title;
            instance.videoUrl = this.videoUrl;
            instance.durationMinutes = this.durationMinutes;
            instance.recordedDate = this.recordedDate;
            instance.instructorName = this.instructorName;
            instance.summaryNotes = this.summaryNotes;
            return instance;
        }
    }
}
