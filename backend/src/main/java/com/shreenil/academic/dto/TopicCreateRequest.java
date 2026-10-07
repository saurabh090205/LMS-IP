package com.shreenil.academic.dto;

public class TopicCreateRequest {
    private Integer topicNumber;
    private String title;
    private Integer estimatedMinutes;

    public TopicCreateRequest() {}

    public Integer getTopicNumber() { return topicNumber; }
    public void setTopicNumber(Integer topicNumber) { this.topicNumber = topicNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(Integer estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
}
