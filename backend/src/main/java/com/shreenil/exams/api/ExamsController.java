package com.shreenil.exams.api;

import com.shreenil.common.ApiResponse;
import com.shreenil.exams.dto.CourseGradebookResponse;
import com.shreenil.exams.dto.ReportCardResponse;
import com.shreenil.exams.service.ExamsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Report Card & Grades", description = "Student academic transcript, evaluations, and faculty gradebook endpoints")
public class ExamsController {

    private final ExamsService examsService;

    public ExamsController(ExamsService examsService) {
        this.examsService = examsService;
    }

    @GetMapping("/students/me/report-card")
    @Operation(summary = "Get official report card and semester evaluations")
    public ResponseEntity<ApiResponse<ReportCardResponse>> getMyReportCard() {
        ReportCardResponse response = examsService.getStudentReportCard();
        return ResponseEntity.ok(
                ApiResponse.<ReportCardResponse>builder()
                        .success(true)
                        .message("Report card retrieved successfully")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/exams/courses/{courseId}/gradebook")
    @Operation(summary = "Get course gradebook matrix for faculty")
    public ResponseEntity<ApiResponse<CourseGradebookResponse>> getCourseGradebook(@PathVariable String courseId) {
        CourseGradebookResponse gradebook = examsService.getCourseGradebook(courseId);
        return ResponseEntity.ok(
                ApiResponse.<CourseGradebookResponse>builder()
                        .success(true)
                        .message("Course gradebook retrieved successfully")
                        .data(gradebook)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
