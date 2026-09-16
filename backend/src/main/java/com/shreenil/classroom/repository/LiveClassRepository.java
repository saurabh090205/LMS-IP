package com.shreenil.classroom.repository;

import com.shreenil.classroom.domain.LiveClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiveClassRepository extends JpaRepository<LiveClass, String> {
    List<LiveClass> findByCourseId(String courseId);
    List<LiveClass> findByStatusOrderByStartTimeAsc(String status);
}
