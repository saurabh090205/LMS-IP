package com.shreenil.homework.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.common.ResourceNotFoundException;
import com.shreenil.homework.domain.Assignment;
import com.shreenil.homework.domain.Submission;
import com.shreenil.homework.dto.AssignmentResponse;
import com.shreenil.homework.dto.SubmissionRequest;
import com.shreenil.homework.dto.SubmissionResponse;
import com.shreenil.homework.repository.AssignmentRepository;
import com.shreenil.homework.repository.SubmissionRepository;
import com.shreenil.profile.domain.StudentProfile;
import com.shreenil.profile.service.StudentProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class HomeworkService {
    private static final Logger log = LoggerFactory.getLogger(HomeworkService.class);


    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final StudentProfileService studentProfileService;

    public HomeworkService(AssignmentRepository assignmentRepository,
                             SubmissionRepository submissionRepository,
                             StudentProfileService studentProfileService) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.studentProfileService = studentProfileService;
    }


    @Transactional(readOnly = true)
    public List<AssignmentResponse> getStudentAssignments() {
        StudentProfile student = studentProfileService.getCurrentStudentProfile();
        List<Assignment> assignments = assignmentRepository.findAll();

        return assignments.stream()
                .map(a -> mapToAssignmentResponse(a, student.getId()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AssignmentResponse getAssignmentById(String id) {
        StudentProfile student = studentProfileService.getCurrentStudentProfile();
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", "id", id));

        return mapToAssignmentResponse(assignment, student.getId());
    }

    @Transactional
    public SubmissionResponse submitHomework(String assignmentId, SubmissionRequest request) {
        StudentProfile student = studentProfileService.getCurrentStudentProfile();
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", "id", assignmentId));

        Optional<Submission> existing = submissionRepository.findByAssignmentIdAndStudentProfileId(assignmentId, student.getId());

        Submission submission;
        if (existing.isPresent()) {
            submission = existing.get();
            submission.setContentText(request.getContentText());
            submission.setFileUrl(request.getFileUrl());
            submission.setFileName(request.getFileName());
            submission.setSubmissionDate(OffsetDateTime.now());
            submission.setStatus("RESUBMITTED");
        } else {
            submission = Submission.builder()
                    .id("sub-" + UUID.randomUUID().toString().substring(0, 8))
                    .assignment(assignment)
                    .studentProfile(student)
                    .submissionDate(OffsetDateTime.now())
                    .contentText(request.getContentText())
                    .fileUrl(request.getFileUrl())
                    .fileName(request.getFileName())
                    .status("SUBMITTED")
                    .build();
        }

        submission = submissionRepository.save(submission);
        return mapToSubmissionResponse(submission);
    }

    private AssignmentResponse mapToAssignmentResponse(Assignment assignment, String studentProfileId) {
        Optional<Submission> submission = submissionRepository
                .findByAssignmentIdAndStudentProfileId(assignment.getId(), studentProfileId);

        String status = "PENDING";
        SubmissionResponse subResponse = null;

        if (submission.isPresent()) {
            subResponse = mapToSubmissionResponse(submission.get());
            status = submission.get().getStatus();
        } else if (assignment.getDueDate().isBefore(OffsetDateTime.now())) {
            status = "OVERDUE";
        }

        return AssignmentResponse.builder()
                .id(assignment.getId())
                .courseId(assignment.getCourse().getId())
                .courseCode(assignment.getCourse().getCourseCode())
                .courseTitle(assignment.getCourse().getTitle())
                .title(assignment.getTitle())
                .description(assignment.getDescription())
                .dueDate(assignment.getDueDate())
                .maxMarks(assignment.getMaxMarks())
                .submissionType(assignment.getSubmissionType())
                .status(status)
                .mySubmission(subResponse)
                .build();
    }

    private SubmissionResponse mapToSubmissionResponse(Submission s) {
        return SubmissionResponse.builder()
                .id(s.getId())
                .assignmentId(s.getAssignment().getId())
                .studentProfileId(s.getStudentProfile().getId())
                .submissionDate(s.getSubmissionDate())
                .contentText(s.getContentText())
                .fileUrl(s.getFileUrl())
                .fileName(s.getFileName())
                .status(s.getStatus())
                .marksObtained(s.getMarksObtained())
                .feedbackComments(s.getFeedbackComments())
                .gradedAt(s.getGradedAt())
                .build();
    }
}
