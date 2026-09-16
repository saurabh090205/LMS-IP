package com.shreenil.ai.dto;

import java.util.List;

public class AiChatResponse {
    private String message;
    private String context;
    private List<String> suggestedActions;
    private List<String> referenceTopics;
    private String modelProvider;

    public AiChatResponse() {}

    public AiChatResponse(String message, String context, List<String> suggestedActions, List<String> referenceTopics, String modelProvider) {
        this.message = message;
        this.context = context;
        this.suggestedActions = suggestedActions;
        this.referenceTopics = referenceTopics;
        this.modelProvider = modelProvider;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getContext() {
        return this.context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public List<String> getSuggestedActions() {
        return this.suggestedActions;
    }

    public void setSuggestedActions(List<String> suggestedActions) {
        this.suggestedActions = suggestedActions;
    }

    public List<String> getReferenceTopics() {
        return this.referenceTopics;
    }

    public void setReferenceTopics(List<String> referenceTopics) {
        this.referenceTopics = referenceTopics;
    }

    public String getModelProvider() {
        return this.modelProvider;
    }

    public void setModelProvider(String modelProvider) {
        this.modelProvider = modelProvider;
    }

    public static AiChatResponseBuilder builder() {
        return new AiChatResponseBuilder();
    }

    public static class AiChatResponseBuilder {
        private String message;
        private String context;
        private List<String> suggestedActions;
        private List<String> referenceTopics;
        private String modelProvider;

        public AiChatResponseBuilder() {}

        public AiChatResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public AiChatResponseBuilder context(String context) {
            this.context = context;
            return this;
        }

        public AiChatResponseBuilder suggestedActions(List<String> suggestedActions) {
            this.suggestedActions = suggestedActions;
            return this;
        }

        public AiChatResponseBuilder referenceTopics(List<String> referenceTopics) {
            this.referenceTopics = referenceTopics;
            return this;
        }

        public AiChatResponseBuilder modelProvider(String modelProvider) {
            this.modelProvider = modelProvider;
            return this;
        }

        public AiChatResponse build() {
            AiChatResponse instance = new AiChatResponse();
            instance.message = this.message;
            instance.context = this.context;
            instance.suggestedActions = this.suggestedActions;
            instance.referenceTopics = this.referenceTopics;
            instance.modelProvider = this.modelProvider;
            return instance;
        }
    }
}
