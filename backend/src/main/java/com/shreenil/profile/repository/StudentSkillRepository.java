package com.shreenil.profile.repository;

import com.shreenil.profile.domain.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSkillRepository extends JpaRepository<StudentSkill, String> {
    List<StudentSkill> findByStudentProfileId(String studentProfileId);
}
