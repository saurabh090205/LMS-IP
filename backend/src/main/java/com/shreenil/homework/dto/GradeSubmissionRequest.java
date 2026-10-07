package com.shreenil.homework.dto;

import java.math.BigDecimal;

public class GradeSubmissionRequest {
    private BigDecimal marksAwarded;
    private String feedback;
    private String gradedBy;

    public GradeSubmissionRequest() {}

    public BigDecimal getMarksAwarded() { return marksAwarded; }
    public void setMarksAwarded(BigDecimal marksAwarded) { this.marksAwarded = marksAwarded; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getGradedBy() { return gradedBy; }
    public void setGradedBy(String gradedBy) { this.gradedBy = gradedBy; }
}
