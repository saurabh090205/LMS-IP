package com.shreenil.homework.dto;

import jakarta.validation.constraints.Size;
public class SubmissionRequest {
    @Size(max = 10000, message = "Submission content exceeds 10,000 characters limit")
    private String contentText;

    private String fileUrl;

    private String fileName;

    public SubmissionRequest() {}

    public SubmissionRequest(String contentText, String fileUrl, String fileName) {
        this.contentText = contentText;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
    }

    public String getContentText() {
        return this.contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getFileUrl() {
        return this.fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public static SubmissionRequestBuilder builder() {
        return new SubmissionRequestBuilder();
    }

    public static class SubmissionRequestBuilder {
        private String contentText;
        private String fileUrl;
        private String fileName;

        public SubmissionRequestBuilder() {}

        public SubmissionRequestBuilder contentText(String contentText) {
            this.contentText = contentText;
            return this;
        }

        public SubmissionRequestBuilder fileUrl(String fileUrl) {
            this.fileUrl = fileUrl;
            return this;
        }

        public SubmissionRequestBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public SubmissionRequest build() {
            SubmissionRequest instance = new SubmissionRequest();
            instance.contentText = this.contentText;
            instance.fileUrl = this.fileUrl;
            instance.fileName = this.fileName;
            return instance;
        }
    }
}
