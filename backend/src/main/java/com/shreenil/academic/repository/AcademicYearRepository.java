package com.shreenil.academic.repository;

import com.shreenil.academic.domain.AcademicYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicYearRepository extends JpaRepository<AcademicYear, String> {
    List<AcademicYear> findByProgramId(String programId);
}
