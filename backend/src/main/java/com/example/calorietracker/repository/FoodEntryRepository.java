package com.example.calorietracker.repository;

import com.example.calorietracker.model.FoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDateTime;
import jakarta.transaction.Transactional; 

@Repository
public interface FoodEntryRepository extends JpaRepository<FoodEntry, Long> {
    List<FoodEntry> findByUserIdAndEntryDateBetween(Long userId, LocalDateTime start, LocalDateTime end);
    
    @Modifying
    @Transactional
    void deleteByUserId(Long userId);
}

