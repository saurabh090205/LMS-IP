package com.shreenil.academic.repository;

import com.shreenil.academic.domain.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, String> {
    List<Topic> findByUnitIdOrderByTopicNumberAsc(String unitId);
}
