package com.shreenil.ai.api;

import com.shreenil.ai.dto.AiChatRequest;
import com.shreenil.ai.dto.AiChatResponse;
import com.shreenil.ai.service.AiMentorService;
import com.shreenil.auth.SecurityUtils;
import com.shreenil.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/v1/ai")
@Tag(name = "AI Mentor", description = "AI Learning Mentor integration boundary endpoints")
public class AiMentorController {

    private final AiMentorService aiMentorService;

    public AiMentorController(AiMentorService aiMentorService) {
        this.aiMentorService = aiMentorService;
    }


    @PostMapping("/chat")
    @Operation(summary = "Interact with the AI Learning Mentor")
    public ResponseEntity<ApiResponse<AiChatResponse>> chat(@Valid @RequestBody AiChatRequest request) {
        String studentId = SecurityUtils.getCurrentUserId();
        AiChatResponse response = aiMentorService.chat(request, studentId);
        return ResponseEntity.ok(
                ApiResponse.<AiChatResponse>builder()
                        .success(true)
                        .message("AI mentor response generated")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
