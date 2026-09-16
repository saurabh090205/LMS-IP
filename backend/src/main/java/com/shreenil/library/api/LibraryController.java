package com.shreenil.library.api;

import com.shreenil.common.ApiResponse;
import com.shreenil.library.dto.LibraryItemResponse;
import com.shreenil.library.service.LibraryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/library")
@Tag(name = "Library", description = "Digital Library resources and catalog endpoints")
public class LibraryController {

    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }


    @GetMapping("/items")
    @Operation(summary = "Get or search library items with optional filters")
    public ResponseEntity<ApiResponse<List<LibraryItemResponse>>> getItems(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String itemType) {
        List<LibraryItemResponse> items = libraryService.getLibraryItems(query, category, itemType);
        return ResponseEntity.ok(
                ApiResponse.<List<LibraryItemResponse>>builder()
                        .success(true)
                        .message("Library catalog retrieved successfully")
                        .data(items)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/items/{id}")
    @Operation(summary = "Get library item by ID")
    public ResponseEntity<ApiResponse<LibraryItemResponse>> getItemById(@PathVariable String id) {
        LibraryItemResponse item = libraryService.getItemById(id);
        return ResponseEntity.ok(
                ApiResponse.<LibraryItemResponse>builder()
                        .success(true)
                        .message("Library item retrieved successfully")
                        .data(item)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
