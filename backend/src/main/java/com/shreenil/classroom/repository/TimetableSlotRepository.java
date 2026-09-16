package com.shreenil.classroom.repository;

import com.shreenil.classroom.domain.TimetableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimetableSlotRepository extends JpaRepository<TimetableSlot, String> {
    List<TimetableSlot> findByStudentProfileId(String studentProfileId);
}
