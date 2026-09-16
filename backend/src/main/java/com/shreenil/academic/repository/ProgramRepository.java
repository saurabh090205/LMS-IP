package com.shreenil.academic.repository;

import com.shreenil.academic.domain.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, String> {
    List<Program> findByInstitutionId(String institutionId);
}
