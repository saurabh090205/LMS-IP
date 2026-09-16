package com.shreenil.user.dto;

import java.util.List;

public class NavigationItemResponse {
    private String id;
    private String label;
    private String path;
    private String icon;
    private String section;
    private boolean isComingSoon;
    private Integer badgeCount;
    private List<NavigationItemResponse> children;

    public NavigationItemResponse() {}

    public NavigationItemResponse(String id, String label, String path, String icon, String section, boolean isComingSoon, Integer badgeCount, List<NavigationItemResponse> children) {
        this.id = id;
        this.label = label;
        this.path = path;
        this.icon = icon;
        this.section = section;
        this.isComingSoon = isComingSoon;
        this.badgeCount = badgeCount;
        this.children = children;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getIcon() {
        return this.icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getSection() {
        return this.section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public boolean isComingSoon() {
        return this.isComingSoon;
    }

    public void setIsComingSoon(boolean isComingSoon) {
        this.isComingSoon = isComingSoon;
    }

    public Integer getBadgeCount() {
        return this.badgeCount;
    }

    public void setBadgeCount(Integer badgeCount) {
        this.badgeCount = badgeCount;
    }

    public List<NavigationItemResponse> getChildren() {
        return this.children;
    }

    public void setChildren(List<NavigationItemResponse> children) {
        this.children = children;
    }

    public static NavigationItemResponseBuilder builder() {
        return new NavigationItemResponseBuilder();
    }

    public static class NavigationItemResponseBuilder {
        private String id;
        private String label;
        private String path;
        private String icon;
        private String section;
        private boolean isComingSoon;
        private Integer badgeCount;
        private List<NavigationItemResponse> children;

        public NavigationItemResponseBuilder() {}

        public NavigationItemResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public NavigationItemResponseBuilder label(String label) {
            this.label = label;
            return this;
        }

        public NavigationItemResponseBuilder path(String path) {
            this.path = path;
            return this;
        }

        public NavigationItemResponseBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }

        public NavigationItemResponseBuilder section(String section) {
            this.section = section;
            return this;
        }

        public NavigationItemResponseBuilder isComingSoon(boolean isComingSoon) {
            this.isComingSoon = isComingSoon;
            return this;
        }

        public NavigationItemResponseBuilder badgeCount(Integer badgeCount) {
            this.badgeCount = badgeCount;
            return this;
        }

        public NavigationItemResponseBuilder children(List<NavigationItemResponse> children) {
            this.children = children;
            return this;
        }

        public NavigationItemResponse build() {
            NavigationItemResponse instance = new NavigationItemResponse();
            instance.id = this.id;
            instance.label = this.label;
            instance.path = this.path;
            instance.icon = this.icon;
            instance.section = this.section;
            instance.isComingSoon = this.isComingSoon;
            instance.badgeCount = this.badgeCount;
            instance.children = this.children;
            return instance;
        }
    }
}
