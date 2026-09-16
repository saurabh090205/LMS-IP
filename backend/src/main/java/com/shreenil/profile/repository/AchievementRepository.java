package com.shreenil.profile.repository;

import com.shreenil.profile.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, String> {
    List<Achievement> findByStudentProfileId(String studentProfileId);
}
