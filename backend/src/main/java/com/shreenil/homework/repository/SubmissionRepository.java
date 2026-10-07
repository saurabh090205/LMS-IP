package com.shreenil.homework.repository;

import com.shreenil.homework.domain.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, String> {
    List<Submission> findByStudentProfileId(String studentProfileId);
    Optional<Submission> findByAssignmentIdAndStudentProfileId(String assignmentId, String studentProfileId);
    List<Submission> findByAssignmentId(String assignmentId);
    List<Submission> findByStatus(String status);
}
