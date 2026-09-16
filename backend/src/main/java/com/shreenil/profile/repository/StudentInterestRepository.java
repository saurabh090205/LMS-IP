package com.shreenil.profile.repository;

import com.shreenil.profile.domain.StudentInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInterestRepository extends JpaRepository<StudentInterest, String> {
    List<StudentInterest> findByStudentProfileId(String studentProfileId);
}
