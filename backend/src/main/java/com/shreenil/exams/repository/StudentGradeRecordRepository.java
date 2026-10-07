package com.shreenil.exams.repository;

import com.shreenil.exams.domain.StudentGradeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGradeRecordRepository extends JpaRepository<StudentGradeRecord, String> {
    List<StudentGradeRecord> findByStudentProfileId(String studentProfileId);
    List<StudentGradeRecord> findByStudentProfileIdAndSemesterNumber(String studentProfileId, Integer semesterNumber);
    List<StudentGradeRecord> findByCourseId(String courseId);
    List<StudentGradeRecord> findByCourseIdAndStudentProfileId(String courseId, String studentProfileId);
}
