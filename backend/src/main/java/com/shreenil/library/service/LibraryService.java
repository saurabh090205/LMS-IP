package com.shreenil.library.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.common.ResourceNotFoundException;
import com.shreenil.library.domain.LibraryItem;
import com.shreenil.library.dto.LibraryItemResponse;
import com.shreenil.library.repository.LibraryItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibraryService {
    private static final Logger log = LoggerFactory.getLogger(LibraryService.class);


    private final LibraryItemRepository libraryItemRepository;

    public LibraryService(LibraryItemRepository libraryItemRepository) {
        this.libraryItemRepository = libraryItemRepository;
    }


    @Transactional(readOnly = true)
    public List<LibraryItemResponse> getLibraryItems(String query, String category, String itemType) {
        List<LibraryItem> items;
        if (query != null && !query.isBlank()) {
            items = libraryItemRepository.searchItems(query.trim());
        } else if (category != null && !category.isBlank()) {
            items = libraryItemRepository.findByCategory(category.trim());
        } else if (itemType != null && !itemType.isBlank()) {
            items = libraryItemRepository.findByItemType(itemType.trim().toUpperCase());
        } else {
            items = libraryItemRepository.findAll();
        }

        return items.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LibraryItemResponse getItemById(String id) {
        LibraryItem item = libraryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LibraryItem", "id", id));
        return mapToResponse(item);
    }

    private LibraryItemResponse mapToResponse(LibraryItem item) {
        return LibraryItemResponse.builder()
                .id(item.getId())
                .title(item.getTitle())
                .author(item.getAuthor())
                .itemType(item.getItemType())
                .category(item.getCategory())
                .coverImageUrl(item.getCoverImageUrl())
                .resourceUrl(item.getResourceUrl())
                .description(item.getDescription())
                .isAvailable(item.getIsAvailable())
                .publishedYear(item.getPublishedYear())
                .build();
    }
}
