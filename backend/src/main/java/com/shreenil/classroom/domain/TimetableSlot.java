package com.shreenil.classroom.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import com.shreenil.profile.domain.StudentProfile;
import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "timetable_slots")
public class TimetableSlot extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "day_of_week", nullable = false, length = 20)
    private String dayOfWeek; // MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "room_or_link", nullable = false, length = 200)
    private String roomOrLink;

    @Column(nullable = false, length = 100)
    private String faculty;

    @Column(name = "slot_type", nullable = false, length = 30)
    private String slotType; // THEORY, LAB, TUTORIAL

    public TimetableSlot() {}

    public TimetableSlot(String id, StudentProfile studentProfile, Course course, String dayOfWeek, LocalTime startTime, LocalTime endTime, String roomOrLink, String faculty, String slotType) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.course = course;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.roomOrLink = roomOrLink;
        this.faculty = faculty;
        this.slotType = slotType;
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

    public static TimetableSlotBuilder builder() {
        return new TimetableSlotBuilder();
    }

    public static class TimetableSlotBuilder {
        private String id;
        private StudentProfile studentProfile;
        private Course course;
        private String dayOfWeek;
        private LocalTime startTime;
        private LocalTime endTime;
        private String roomOrLink;
        private String faculty;
        private String slotType;

        public TimetableSlotBuilder() {}

        public TimetableSlotBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TimetableSlotBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public TimetableSlotBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public TimetableSlotBuilder dayOfWeek(String dayOfWeek) {
            this.dayOfWeek = dayOfWeek;
            return this;
        }

        public TimetableSlotBuilder startTime(LocalTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public TimetableSlotBuilder endTime(LocalTime endTime) {
            this.endTime = endTime;
            return this;
        }

        public TimetableSlotBuilder roomOrLink(String roomOrLink) {
            this.roomOrLink = roomOrLink;
            return this;
        }

        public TimetableSlotBuilder faculty(String faculty) {
            this.faculty = faculty;
            return this;
        }

        public TimetableSlotBuilder slotType(String slotType) {
            this.slotType = slotType;
            return this;
        }

        public TimetableSlot build() {
            TimetableSlot instance = new TimetableSlot();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.course = this.course;
            instance.dayOfWeek = this.dayOfWeek;
            instance.startTime = this.startTime;
            instance.endTime = this.endTime;
            instance.roomOrLink = this.roomOrLink;
            instance.faculty = this.faculty;
            instance.slotType = this.slotType;
            return instance;
        }
    }
}
