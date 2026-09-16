package com.shreenil.academic.repository;

import com.shreenil.academic.domain.LearningResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningResourceRepository extends JpaRepository<LearningResource, String> {
    List<LearningResource> findByTopicId(String topicId);
}
