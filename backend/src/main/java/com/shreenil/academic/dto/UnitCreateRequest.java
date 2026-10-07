package com.shreenil.academic.dto;

public class UnitCreateRequest {
    private Integer unitNumber;
    private String title;
    private Integer theoryHours;
    private String coMapping;

    public UnitCreateRequest() {}

    public Integer getUnitNumber() { return unitNumber; }
    public void setUnitNumber(Integer unitNumber) { this.unitNumber = unitNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getTheoryHours() { return theoryHours; }
    public void setTheoryHours(Integer theoryHours) { this.theoryHours = theoryHours; }

    public String getCoMapping() { return coMapping; }
    public void setCoMapping(String coMapping) { this.coMapping = coMapping; }
}
