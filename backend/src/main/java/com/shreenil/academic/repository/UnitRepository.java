package com.shreenil.academic.repository;

import com.shreenil.academic.domain.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, String> {
    List<Unit> findByCourseIdOrderByUnitNumberAsc(String courseId);
}
