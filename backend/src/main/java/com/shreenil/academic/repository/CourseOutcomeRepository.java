package com.shreenil.academic.repository;

import com.shreenil.academic.domain.CourseOutcome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseOutcomeRepository extends JpaRepository<CourseOutcome, String> {
    List<CourseOutcome> findByCourseIdOrderByCoNumberAsc(String courseId);
}
