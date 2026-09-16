package com.shreenil.profile.repository;

import com.shreenil.profile.domain.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, String> {
    Optional<StudentProfile> findByUserId(String userId);
    Optional<StudentProfile> findByEnrollmentNumber(String enrollmentNumber);
}
