package com.shreenil.classroom.dto;

import java.time.OffsetDateTime;

public class LiveClassCreateRequest {
    private String courseId;
    private String title;
    private String teacherName;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private String meetingUrl;
    private String jitsiRoomName;

    public LiveClassCreateRequest() {}

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTeacherName() { return teacherName; }
    public void setTeacherName(String teacherName) { this.teacherName = teacherName; }

    public OffsetDateTime getStartTime() { return startTime; }
    public void setStartTime(OffsetDateTime startTime) { this.startTime = startTime; }

    public OffsetDateTime getEndTime() { return endTime; }
    public void setEndTime(OffsetDateTime endTime) { this.endTime = endTime; }

    public String getMeetingUrl() { return meetingUrl; }
    public void setMeetingUrl(String meetingUrl) { this.meetingUrl = meetingUrl; }

    public String getJitsiRoomName() { return jitsiRoomName; }
    public void setJitsiRoomName(String jitsiRoomName) { this.jitsiRoomName = jitsiRoomName; }
}
