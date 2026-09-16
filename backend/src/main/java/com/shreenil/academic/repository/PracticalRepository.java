package com.shreenil.academic.repository;

import com.shreenil.academic.domain.Practical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticalRepository extends JpaRepository<Practical, String> {
    List<Practical> findByCourseIdOrderByExperimentNumberAsc(String courseId);
}
