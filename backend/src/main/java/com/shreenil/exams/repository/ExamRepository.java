package com.shreenil.exams.repository;

import com.shreenil.exams.domain.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, String> {
    List<Exam> findByCourseId(String courseId);
}
