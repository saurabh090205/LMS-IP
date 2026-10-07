package com.shreenil.profile.repository;

import com.shreenil.profile.domain.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, String> {
    List<Enrollment> findByStudentProfileId(String studentProfileId);
    List<Enrollment> findByCourseId(String courseId);
}
