package com.shreenil.library.repository;

import com.shreenil.library.domain.LibraryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, String> {
    List<LibraryItem> findByCategory(String category);
    List<LibraryItem> findByItemType(String itemType);

    @Query("SELECT l FROM LibraryItem l WHERE LOWER(l.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.author) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(l.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<LibraryItem> searchItems(@Param("query") String query);
}
