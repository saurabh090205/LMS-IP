package com.shreenil.classroom.dto;

import java.time.LocalTime;

public class TimetableSlotResponse {
    private String id;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private String formattedTime;
    private String roomOrLink;
    private String faculty;
    private String slotType;
    private String badgeColor;

    public TimetableSlotResponse() {}

    public TimetableSlotResponse(String id, String courseId, String courseCode, String courseTitle, String dayOfWeek, LocalTime startTime, LocalTime endTime, String formattedTime, String roomOrLink, String faculty, String slotType, String badgeColor) {
        this.id = id;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.formattedTime = formattedTime;
        this.roomOrLink = roomOrLink;
        this.faculty = faculty;
        this.slotType = slotType;
        this.badgeColor = badgeColor;
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

    public String getDayOfWeek() {
        return this.dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getFormattedTime() {
        return this.formattedTime;
    }

    public void setFormattedTime(String formattedTime) {
        this.formattedTime = formattedTime;
    }

    public String getRoomOrLink() {
        return this.roomOrLink;
    }

    public void setRoomOrLink(String roomOrLink) {
        this.roomOrLink = roomOrLink;
    }

    public String getFaculty() {
        return this.faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getSlotType() {
        return this.slotType;
    }

    public void setSlotType(String slotType) {
        this.slotType = slotType;
    }

    public String getBadgeColor() {
        return this.badgeColor;
    }

    public void setBadgeColor(String badgeColor) {
        this.badgeColor = badgeColor;
    }

    public static TimetableSlotResponseBuilder builder() {
        return new TimetableSlotResponseBuilder();
    }

    public static class TimetableSlotResponseBuilder {
        private String id;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String dayOfWeek;
        private LocalTime startTime;
        private LocalTime endTime;
        private String formattedTime;
        private String roomOrLink;
        private String faculty;
        private String slotType;
        private String badgeColor;

        public TimetableSlotResponseBuilder() {}

        public TimetableSlotResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TimetableSlotResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public TimetableSlotResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public TimetableSlotResponseBuilder courseTitle(String courseTitle) {
            this.courseTitle = courseTitle;
            return this;
        }

        public TimetableSlotResponseBuilder dayOfWeek(String dayOfWeek) {
            this.dayOfWeek = dayOfWeek;
            return this;
        }

        public TimetableSlotResponseBuilder startTime(LocalTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public TimetableSlotResponseBuilder endTime(LocalTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public TimetableSlotResponseBuilder formattedTime(String formattedTime) {
            this.formattedTime = formattedTime;
            return this;
        }

        public TimetableSlotResponseBuilder roomOrLink(String roomOrLink) {
            this.roomOrLink = roomOrLink;
            return this;
        }

        public TimetableSlotResponseBuilder faculty(String faculty) {
            this.faculty = faculty;
            return this;
        }

        public TimetableSlotResponseBuilder slotType(String slotType) {
            this.slotType = slotType;
            return this;
        }

        public TimetableSlotResponseBuilder badgeColor(String badgeColor) {
            this.badgeColor = badgeColor;
            return this;
        }

        public TimetableSlotResponse build() {
            TimetableSlotResponse instance = new TimetableSlotResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.courseTitle = this.courseTitle;
            instance.dayOfWeek = this.dayOfWeek;
            instance.startTime = this.startTime;
            instance.endTime = this.endTime;
            instance.formattedTime = this.formattedTime;
            instance.roomOrLink = this.roomOrLink;
            instance.faculty = this.faculty;
            instance.slotType = this.slotType;
            instance.badgeColor = this.badgeColor;
            return instance;
        }
    }
}
