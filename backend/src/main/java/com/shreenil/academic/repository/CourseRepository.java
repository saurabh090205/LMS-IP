package com.shreenil.academic.repository;

import com.shreenil.academic.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByAcademicModuleId(String academicModuleId);

    @Query("SELECT c FROM Course c JOIN FETCH c.academicModule m JOIN FETCH m.academicYear y JOIN FETCH y.program p WHERE p.id = :programId")
    List<Course> findByProgramId(@Param("programId") String programId);

    Optional<Course> findByCourseCode(String courseCode);
}
