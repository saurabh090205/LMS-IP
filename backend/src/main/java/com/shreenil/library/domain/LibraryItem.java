package com.shreenil.library.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "library_items")
public class LibraryItem extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 150)
    private String author;

    @Column(name = "item_type", nullable = false, length = 50)
    private String itemType; // BOOK, JOURNAL, VIDEO, REFERENCE, PAPER

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "cover_image_url", length = 512)
    private String coverImageUrl;

    @Column(name = "resource_url", length = 512)
    private String resourceUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable;

    @Column(name = "published_year")
    private Integer publishedYear;

    public LibraryItem() {}

    public LibraryItem(String id, String title, String author, String itemType, String category, String coverImageUrl, String resourceUrl, String description, Boolean isAvailable, Integer publishedYear) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.itemType = itemType;
        this.category = category;
        this.coverImageUrl = coverImageUrl;
        this.resourceUrl = resourceUrl;
        this.description = description;
        this.isAvailable = isAvailable;
        this.publishedYear = publishedYear;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getItemType() {
        return this.itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCoverImageUrl() {
        return this.coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getResourceUrl() {
        return this.resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isAvailable() {
        return this.isAvailable;
    }

    public Boolean getIsAvailable() {
        return this.isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Integer getPublishedYear() {
        return this.publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public static LibraryItemBuilder builder() {
        return new LibraryItemBuilder();
    }

    public static class LibraryItemBuilder {
        private String id;
        private String title;
        private String author;
        private String itemType;
        private String category;
        private String coverImageUrl;
        private String resourceUrl;
        private String description;
        private Boolean isAvailable;
        private Integer publishedYear;

        public LibraryItemBuilder() {}

        public LibraryItemBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LibraryItemBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LibraryItemBuilder author(String author) {
            this.author = author;
            return this;
        }

        public LibraryItemBuilder itemType(String itemType) {
            this.itemType = itemType;
            return this;
        }

        public LibraryItemBuilder category(String category) {
            this.category = category;
            return this;
        }

        public LibraryItemBuilder coverImageUrl(String coverImageUrl) {
            this.coverImageUrl = coverImageUrl;
            return this;
        }

        public LibraryItemBuilder resourceUrl(String resourceUrl) {
            this.resourceUrl = resourceUrl;
            return this;
        }

        public LibraryItemBuilder description(String description) {
            this.description = description;
            return this;
        }

        public LibraryItemBuilder isAvailable(Boolean isAvailable) {
            this.isAvailable = isAvailable;
            return this;
        }

        public LibraryItemBuilder publishedYear(Integer publishedYear) {
            this.publishedYear = publishedYear;
            return this;
        }

        public LibraryItem build() {
            LibraryItem instance = new LibraryItem();
            instance.id = this.id;
            instance.title = this.title;
            instance.author = this.author;
            instance.itemType = this.itemType;
            instance.category = this.category;
            instance.coverImageUrl = this.coverImageUrl;
            instance.resourceUrl = this.resourceUrl;
            instance.description = this.description;
            instance.isAvailable = this.isAvailable;
            instance.publishedYear = this.publishedYear;
            return instance;
        }
    }
}
