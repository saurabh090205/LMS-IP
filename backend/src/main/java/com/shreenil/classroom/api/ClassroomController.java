package com.shreenil.classroom.api;

import com.shreenil.classroom.dto.LiveClassCreateRequest;
import com.shreenil.classroom.dto.LiveClassResponse;
import com.shreenil.classroom.dto.RecordedLectureResponse;
import com.shreenil.classroom.dto.TimetableSlotResponse;
import com.shreenil.classroom.service.ClassroomService;
import com.shreenil.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Classroom & Timetable", description = "Live virtual classes, recorded lectures, and timetable endpoints")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping("/classes")
    @Operation(summary = "Get list of all live virtual classes")
    public ResponseEntity<ApiResponse<List<LiveClassResponse>>> getAllClasses() {
        List<LiveClassResponse> classes = classroomService.getLiveClasses();
        return ResponseEntity.ok(
                ApiResponse.<List<LiveClassResponse>>builder()
                        .success(true)
                        .message("Live classes retrieved successfully")
                        .data(classes)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PostMapping("/classes")
    @Operation(summary = "Schedule a new live class")
    public ResponseEntity<ApiResponse<LiveClassResponse>> scheduleClass(
            @Valid @RequestBody LiveClassCreateRequest request) {
        LiveClassResponse liveClass = classroomService.createLiveClass(request);
        return ResponseEntity.ok(
                ApiResponse.<LiveClassResponse>builder()
                        .success(true)
                        .message("Live class scheduled successfully")
                        .data(liveClass)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PutMapping("/classes/{id}/status")
    @Operation(summary = "Update status of a live class")
    public ResponseEntity<ApiResponse<LiveClassResponse>> updateClassStatus(
            @PathVariable String id,
            @RequestParam String status) {
        LiveClassResponse liveClass = classroomService.updateClassStatus(id, status);
        return ResponseEntity.ok(
                ApiResponse.<LiveClassResponse>builder()
                        .success(true)
                        .message("Live class status updated successfully")
                        .data(liveClass)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/students/me/classes")
    @Operation(summary = "Get list of live virtual classes for current student")
    public ResponseEntity<ApiResponse<List<LiveClassResponse>>> getMyClasses() {
        List<LiveClassResponse> classes = classroomService.getLiveClasses();
        return ResponseEntity.ok(
                ApiResponse.<List<LiveClassResponse>>builder()
                        .success(true)
                        .message("Live classes retrieved successfully")
                        .data(classes)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/classes/{id}")
    @Operation(summary = "Get live class details by ID")
    public ResponseEntity<ApiResponse<LiveClassResponse>> getClassById(@PathVariable String id) {
        LiveClassResponse liveClass = classroomService.getLiveClassById(id);
        return ResponseEntity.ok(
                ApiResponse.<LiveClassResponse>builder()
                        .success(true)
                        .message("Class details retrieved successfully")
                        .data(liveClass)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/classes/{id}/recording")
    @Operation(summary = "Get recording for a class")
    public ResponseEntity<ApiResponse<RecordedLectureResponse>> getClassRecording(@PathVariable String id) {
        RecordedLectureResponse recording = classroomService.getRecordedLectureById(id);
        return ResponseEntity.ok(
                ApiResponse.<RecordedLectureResponse>builder()
                        .success(true)
                        .message("Class recording retrieved successfully")
                        .data(recording)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/students/me/recordings")
    @Operation(summary = "Get all recorded lectures (optionally filtered by courseId)")
    public ResponseEntity<ApiResponse<List<RecordedLectureResponse>>> getRecordings(
            @RequestParam(required = false) String courseId) {
        List<RecordedLectureResponse> recordings = classroomService.getRecordedLectures(courseId);
        return ResponseEntity.ok(
                ApiResponse.<List<RecordedLectureResponse>>builder()
                        .success(true)
                        .message("Recorded lectures retrieved successfully")
                        .data(recordings)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/students/me/timetable")
    @Operation(summary = "Get current student weekly timetable schedule")
    public ResponseEntity<ApiResponse<List<TimetableSlotResponse>>> getTimetable() {
        List<TimetableSlotResponse> slots = classroomService.getStudentTimetable();
        return ResponseEntity.ok(
                ApiResponse.<List<TimetableSlotResponse>>builder()
                        .success(true)
                        .message("Student timetable schedule retrieved successfully")
                        .data(slots)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
