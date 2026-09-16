package com.shreenil.exams.api;

import com.shreenil.common.ApiResponse;
import com.shreenil.exams.dto.ReportCardResponse;
import com.shreenil.exams.service.ExamsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/v1/students")
@Tag(name = "Report Card & Grades", description = "Student academic transcript and evaluation endpoints")
public class ExamsController {

    private final ExamsService examsService;

    public ExamsController(ExamsService examsService) {
        this.examsService = examsService;
    }


    @GetMapping("/me/report-card")
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
}
