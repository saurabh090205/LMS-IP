package com.shreenil.classroom.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.academic.domain.Unit;
import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "recorded_lectures")
public class RecordedLecture extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "video_url", nullable = false, length = 512)
    private String videoUrl;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "recorded_date", nullable = false)
    private LocalDate recordedDate;

    @Column(name = "instructor_name", nullable = false, length = 100)
    private String instructorName;

    @Column(name = "summary_notes", columnDefinition = "TEXT")
    private String summaryNotes;

    public RecordedLecture() {}

    public RecordedLecture(String id, Course course, Unit unit, String title, String videoUrl, Integer durationMinutes, LocalDate recordedDate, String instructorName, String summaryNotes) {
        this.id = id;
        this.course = course;
        this.unit = unit;
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

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Unit getUnit() {
        return this.unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
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

    public static RecordedLectureBuilder builder() {
        return new RecordedLectureBuilder();
    }

    public static class RecordedLectureBuilder {
        private String id;
        private Course course;
        private Unit unit;
        private String title;
        private String videoUrl;
        private Integer durationMinutes;
        private LocalDate recordedDate;
        private String instructorName;
        private String summaryNotes;

        public RecordedLectureBuilder() {}

        public RecordedLectureBuilder id(String id) {
            this.id = id;
            return this;
        }

        public RecordedLectureBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public RecordedLectureBuilder unit(Unit unit) {
            this.unit = unit;
            return this;
        }

        public RecordedLectureBuilder title(String title) {
            this.title = title;
            return this;
        }

        public RecordedLectureBuilder videoUrl(String videoUrl) {
            this.videoUrl = videoUrl;
            return this;
        }

        public RecordedLectureBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public RecordedLectureBuilder recordedDate(LocalDate recordedDate) {
            this.recordedDate = recordedDate;
            return this;
        }

        public RecordedLectureBuilder instructorName(String instructorName) {
            this.instructorName = instructorName;
            return this;
        }

        public RecordedLectureBuilder summaryNotes(String summaryNotes) {
            this.summaryNotes = summaryNotes;
            return this;
        }

        public RecordedLecture build() {
            RecordedLecture instance = new RecordedLecture();
            instance.id = this.id;
            instance.course = this.course;
            instance.unit = this.unit;
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
