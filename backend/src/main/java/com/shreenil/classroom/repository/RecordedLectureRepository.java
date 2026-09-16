package com.shreenil.classroom.repository;

import com.shreenil.classroom.domain.RecordedLecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordedLectureRepository extends JpaRepository<RecordedLecture, String> {
    List<RecordedLecture> findByCourseIdOrderByRecordedDateDesc(String courseId);
}
