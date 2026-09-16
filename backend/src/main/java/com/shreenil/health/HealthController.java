package com.shreenil.health;

import com.shreenil.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Map;

@RestController
@Tag(name = "Root & Health", description = "System health and API discovery endpoints")
public class HealthController {

    @GetMapping(value = {"/", "/api/v1", "/api/v1/"})
    @Operation(summary = "Get API information and status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getApiInfo() {
        Map<String, Object> apiInfo = Map.of(
                "service", "shreenil-backend",
                "version", "v1",
                "status", "running",
                "environment", "development"
        );

        return ResponseEntity.ok(
                ApiResponse.<Map<String, Object>>builder()
                        .success(true)
                        .message("Shreenil API is running")
                        .data(apiInfo)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/api/v1/health")
    @Operation(summary = "Check service health status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealth() {
        Map<String, Object> healthInfo = Map.of(
                "status", "UP",
                "service", "shreenil-backend",
                "version", "1.0.0-MVP",
                "timestamp", OffsetDateTime.now(),
                "environment", "development"
        );

        return ResponseEntity.ok(
                ApiResponse.<Map<String, Object>>builder()
                        .success(true)
                        .message("Service healthy")
                        .data(healthInfo)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
