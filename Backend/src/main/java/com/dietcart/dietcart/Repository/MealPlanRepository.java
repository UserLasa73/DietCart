package com.dietcart.dietcart.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dietcart.dietcart.model.MealPlans;

public interface MealPlanRepository extends JpaRepository<MealPlans, Long> {

    @Query("SELECT m FROM MealPlans m WHERE m.dietType.id = :dietTypeId")
    List<MealPlans> findByDietTypeId(@Param("dietTypeId") Long dietTypeId);
    
    // Basic search for admin panel
    List<MealPlans> findByNameContainingIgnoreCase(String name);
}
