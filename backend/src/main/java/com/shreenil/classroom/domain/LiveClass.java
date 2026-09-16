package com.shreenil.classroom.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "live_classes")
public class LiveClass extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "teacher_name", nullable = false, length = 100)
    private String teacherName;

    @Column(name = "start_time", nullable = false)
    private OffsetDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private OffsetDateTime endTime;

    @Column(name = "meeting_url", nullable = false, length = 512)
    private String meetingUrl;

    @Column(name = "jitsi_room_name", nullable = false, length = 100)
    private String jitsiRoomName;

    @Column(nullable = false, length = 30)
    private String status; // SCHEDULED, LIVE, COMPLETED, CANCELLED

    public LiveClass() {}

    public LiveClass(String id, Course course, String title, String teacherName, OffsetDateTime startTime, OffsetDateTime endTime, String meetingUrl, String jitsiRoomName, String status) {
        this.id = id;
        this.course = course;
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

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
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

    public static LiveClassBuilder builder() {
        return new LiveClassBuilder();
    }

    public static class LiveClassBuilder {
        private String id;
        private Course course;
        private String title;
        private String teacherName;
        private OffsetDateTime startTime;
        private OffsetDateTime endTime;
        private String meetingUrl;
        private String jitsiRoomName;
        private String status;

        public LiveClassBuilder() {}

        public LiveClassBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LiveClassBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public LiveClassBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LiveClassBuilder teacherName(String teacherName) {
            this.teacherName = teacherName;
            return this;
        }

        public LiveClassBuilder startTime(OffsetDateTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public LiveClassBuilder endTime(OffsetDateTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public LiveClassBuilder meetingUrl(String meetingUrl) {
            this.meetingUrl = meetingUrl;
            return this;
        }

        public LiveClassBuilder jitsiRoomName(String jitsiRoomName) {
            this.jitsiRoomName = jitsiRoomName;
            return this;
        }

        public LiveClassBuilder status(String status) {
            this.status = status;
            return this;
        }

        public LiveClass build() {
            LiveClass instance = new LiveClass();
            instance.id = this.id;
            instance.course = this.course;
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
