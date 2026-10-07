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
import com.shreenil.academic.domain.Course;
import com.shreenil.academic.repository.CourseRepository;
import com.shreenil.homework.dto.AssignmentCreateRequest;
import com.shreenil.homework.dto.FacultySubmissionResponse;
import com.shreenil.homework.dto.GradeSubmissionRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
    private final CourseRepository courseRepository;

    public HomeworkService(AssignmentRepository assignmentRepository,
                             SubmissionRepository submissionRepository,
                             StudentProfileService studentProfileService,
                             CourseRepository courseRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.studentProfileService = studentProfileService;
        this.courseRepository = courseRepository;
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

    @Transactional
    public AssignmentResponse createAssignment(AssignmentCreateRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));

        Assignment assignment = Assignment.builder()
                .id("asg-" + UUID.randomUUID().toString().substring(0, 8))
                .course(course)
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate() != null ? request.getDueDate() : OffsetDateTime.now().plusWeeks(1))
                .maxMarks(request.getMaxMarks() != null ? request.getMaxMarks() : new BigDecimal("100.00"))
                .submissionType(request.getSubmissionType() != null ? request.getSubmissionType() : "FILE_UPLOAD")
                .status("PUBLISHED")
                .build();

        assignment = assignmentRepository.save(assignment);
        return mapToAssignmentResponse(assignment, null);
    }

    @Transactional(readOnly = true)
    public List<AssignmentResponse> getAllAssignments() {
        return assignmentRepository.findAll().stream()
                .map(a -> mapToAssignmentResponse(a, null))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AssignmentResponse> getAssignmentsByCourse(String courseId) {
        return assignmentRepository.findByCourseId(courseId).stream()
                .map(a -> mapToAssignmentResponse(a, null))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FacultySubmissionResponse> getAssignmentSubmissions(String assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId).stream()
                .map(this::mapToFacultySubmission)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FacultySubmissionResponse> getPendingSubmissions() {
        List<Submission> submissions = submissionRepository.findByStatus("SUBMITTED");
        List<Submission> resubmitted = submissionRepository.findByStatus("RESUBMITTED");
        submissions.addAll(resubmitted);
        return submissions.stream()
                .map(this::mapToFacultySubmission)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FacultySubmissionResponse> getAllSubmissions() {
        return submissionRepository.findAll().stream()
                .map(this::mapToFacultySubmission)
                .collect(Collectors.toList());
    }

    @Transactional
    public FacultySubmissionResponse gradeSubmission(String submissionId, GradeSubmissionRequest request) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Submission", "id", submissionId));

        submission.setMarksObtained(request.getMarksAwarded());
        submission.setFeedbackComments(request.getFeedback());
        submission.setStatus("GRADED");
        submission.setGradedAt(OffsetDateTime.now());
        submission = submissionRepository.save(submission);

        return mapToFacultySubmission(submission);
    }

    private FacultySubmissionResponse mapToFacultySubmission(Submission s) {
        String studentName = "Student";
        String studentEmail = "student@vit.edu";
        if (s.getStudentProfile() != null) {
            if (s.getStudentProfile().getUser() != null) {
                studentName = s.getStudentProfile().getUser().getFirstName() + " " + s.getStudentProfile().getUser().getLastName();
                studentEmail = s.getStudentProfile().getUser().getEmail();
            } else if (s.getStudentProfile().getEnrollmentNumber() != null) {
                studentName = s.getStudentProfile().getEnrollmentNumber();
            }
        }
        Assignment a = s.getAssignment();
        return FacultySubmissionResponse.builder()
                .id(s.getId())
                .assignmentId(a != null ? a.getId() : "")
                .assignmentTitle(a != null ? a.getTitle() : "")
                .courseId(a != null && a.getCourse() != null ? a.getCourse().getId() : "")
                .courseCode(a != null && a.getCourse() != null ? a.getCourse().getCourseCode() : "")
                .courseTitle(a != null && a.getCourse() != null ? a.getCourse().getTitle() : "")
                .studentProfileId(s.getStudentProfile() != null ? s.getStudentProfile().getId() : "")
                .studentName(studentName)
                .studentEmail(studentEmail)
                .submissionDate(s.getSubmissionDate())
                .status(s.getStatus())
                .contentText(s.getContentText())
                .fileName(s.getFileName())
                .fileUrl(s.getFileUrl())
                .marksAwarded(s.getMarksObtained())
                .maxMarks(a != null ? a.getMaxMarks() : null)
                .feedback(s.getFeedbackComments())
                .gradedAt(s.getGradedAt())
                .gradedBy("Dr. Elena Rostova")
                .build();
    }
}
