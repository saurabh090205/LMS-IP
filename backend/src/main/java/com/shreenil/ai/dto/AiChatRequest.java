package com.shreenil.ai.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

public class AiChatRequest {
    @NotBlank(message = "Message cannot be blank")
    private String message;

    private String courseId;
    private String courseCode;
    private String unitId;
    private String topicId;
    private String context;
    private Map<String, Object> metadata;

    public AiChatRequest() {}

    public AiChatRequest(String message, String courseId, String courseCode, String unitId, String topicId, String context, Map<String, Object> metadata) {
        this.message = message;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.unitId = unitId;
        this.topicId = topicId;
        this.context = context;
        this.metadata = metadata;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCourseId() {
        return this.courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseCode() {
        return this.courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getUnitId() {
        return this.unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getTopicId() {
        return this.topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public String getContext() {
        return this.context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Map<String, Object> getMetadata() {
        return this.metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public static AiChatRequestBuilder builder() {
        return new AiChatRequestBuilder();
    }

    public static class AiChatRequestBuilder {
        private String message;
        private String courseId;
        private String courseCode;
        private String unitId;
        private String topicId;
        private String context;
        private Map<String, Object> metadata;

        public AiChatRequestBuilder() {}

        public AiChatRequestBuilder message(String message) {
            this.message = message;
            return this;
        }

        public AiChatRequestBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public AiChatRequestBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public AiChatRequestBuilder unitId(String unitId) {
            this.unitId = unitId;
            return this;
        }

        public AiChatRequestBuilder topicId(String topicId) {
            this.topicId = topicId;
            return this;
        }

        public AiChatRequestBuilder context(String context) {
            this.context = context;
            return this;
        }

        public AiChatRequestBuilder metadata(Map<String, Object> metadata) {
            this.metadata = metadata;
            return this;
        }

        public AiChatRequest build() {
            AiChatRequest instance = new AiChatRequest();
            instance.message = this.message;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.unitId = this.unitId;
            instance.topicId = this.topicId;
            instance.context = this.context;
            instance.metadata = this.metadata;
            return instance;
        }
    }
}
