package com.shreenil.academic.repository;

import com.shreenil.academic.domain.AcademicModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicModuleRepository extends JpaRepository<AcademicModule, String> {
    List<AcademicModule> findByAcademicYearId(String academicYearId);
}
