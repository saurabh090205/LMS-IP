package com.shreenil.classroom.dto;

import java.time.OffsetDateTime;

public class LiveClassResponse {
    private String id;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String title;
    private String teacherName;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private String meetingUrl;
    private String jitsiRoomName;
    private String status;

    public LiveClassResponse() {}

    public LiveClassResponse(String id, String courseId, String courseCode, String courseTitle, String title, String teacherName, OffsetDateTime startTime, OffsetDateTime endTime, String meetingUrl, String jitsiRoomName, String status) {
        this.id = id;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.title = title;
        this.teacherName = teacherName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.meetingUrl = meetingUrl;
        this.jitsiRoomName = jitsiRoomName;
        this.status = status;
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

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTeacherName() {
        return this.teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public OffsetDateTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(OffsetDateTime startTime) {
        this.startTime = startTime;
    }

    public OffsetDateTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(OffsetDateTime endTime) {
        this.endTime = endTime;
    }

    public String getMeetingUrl() {
        return this.meetingUrl;
    }

    public void setMeetingUrl(String meetingUrl) {
        this.meetingUrl = meetingUrl;
    }

    public String getJitsiRoomName() {
        return this.jitsiRoomName;
    }

    public void setJitsiRoomName(String jitsiRoomName) {
        this.jitsiRoomName = jitsiRoomName;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static LiveClassResponseBuilder builder() {
        return new LiveClassResponseBuilder();
    }

    public static class LiveClassResponseBuilder {
        private String id;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String title;
        private String teacherName;
        private OffsetDateTime startTime;
        private OffsetDateTime endTime;
        private String meetingUrl;
        private String jitsiRoomName;
        private String status;

        public LiveClassResponseBuilder() {}

        public LiveClassResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LiveClassResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public LiveClassResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public LiveClassResponseBuilder courseTitle(String courseTitle) {
            this.courseTitle = courseTitle;
            return this;
        }

        public LiveClassResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LiveClassResponseBuilder teacherName(String teacherName) {
            this.teacherName = teacherName;
            return this;
        }

        public LiveClassResponseBuilder startTime(OffsetDateTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public LiveClassResponseBuilder endTime(OffsetDateTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public LiveClassResponseBuilder meetingUrl(String meetingUrl) {
            this.meetingUrl = meetingUrl;
            return this;
        }

        public LiveClassResponseBuilder jitsiRoomName(String jitsiRoomName) {
            this.jitsiRoomName = jitsiRoomName;
            return this;
        }

        public LiveClassResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public LiveClassResponse build() {
            LiveClassResponse instance = new LiveClassResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.courseTitle = this.courseTitle;
            instance.title = this.title;
            instance.teacherName = this.teacherName;
            instance.startTime = this.startTime;
            instance.endTime = this.endTime;
            instance.meetingUrl = this.meetingUrl;
            instance.jitsiRoomName = this.jitsiRoomName;
            instance.status = this.status;
            return instance;
        }
    }
}
