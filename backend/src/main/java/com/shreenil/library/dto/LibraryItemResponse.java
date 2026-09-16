package com.shreenil.library.dto;

public class LibraryItemResponse {
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

    public LibraryItemResponse() {}

    public LibraryItemResponse(String id, String title, String author, String itemType, String category, String coverImageUrl, String resourceUrl, String description, Boolean isAvailable, Integer publishedYear) {
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

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Integer getPublishedYear() {
        return this.publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public static LibraryItemResponseBuilder builder() {
        return new LibraryItemResponseBuilder();
    }

    public static class LibraryItemResponseBuilder {
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

        public LibraryItemResponseBuilder() {}

        public LibraryItemResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LibraryItemResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LibraryItemResponseBuilder author(String author) {
            this.author = author;
            return this;
        }

        public LibraryItemResponseBuilder itemType(String itemType) {
            this.itemType = itemType;
            return this;
        }

        public LibraryItemResponseBuilder category(String category) {
            this.category = category;
            return this;
        }

        public LibraryItemResponseBuilder coverImageUrl(String coverImageUrl) {
            this.coverImageUrl = coverImageUrl;
            return this;
        }

        public LibraryItemResponseBuilder resourceUrl(String resourceUrl) {
            this.resourceUrl = resourceUrl;
            return this;
        }

        public LibraryItemResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public LibraryItemResponseBuilder isAvailable(Boolean isAvailable) {
            this.isAvailable = isAvailable;
            return this;
        }

        public LibraryItemResponseBuilder publishedYear(Integer publishedYear) {
            this.publishedYear = publishedYear;
            return this;
        }

        public LibraryItemResponse build() {
            LibraryItemResponse instance = new LibraryItemResponse();
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
