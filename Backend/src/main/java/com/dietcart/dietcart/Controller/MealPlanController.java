package com.dietcart.dietcart.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dietcart.dietcart.Service.MealPlanService;
import com.dietcart.dietcart.model.MealPlans;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/meal-plans")
public class MealPlanController {
    private final MealPlanService mealPlanService;

    public MealPlanController(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

    @GetMapping
    public ResponseEntity<List<MealPlans>> getAllMealPlans() {
        return ResponseEntity.ok(mealPlanService.getAllMealPlans());
    }

    @GetMapping("/by-diet-type/{dietTypeId}")
    public ResponseEntity<List<MealPlans>> getByDietType(@PathVariable Long dietTypeId) {
        return ResponseEntity.ok(mealPlanService.getMealPlansByDietType(dietTypeId));
    }

    @PostMapping
    public ResponseEntity<MealPlans> create(@RequestBody MealPlans mealPlan) {
        return ResponseEntity.ok(mealPlanService.createMealPlan(mealPlan));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealPlans> updateMealPlan(
            @PathVariable Long id,
            @RequestBody MealPlans mealPlanDetails) {

        MealPlans updatedMealPlan = mealPlanService.updateMealPlan(id, mealPlanDetails);
        return ResponseEntity.ok(updatedMealPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mealPlanService.deleteMealPlan(id);
        return ResponseEntity.noContent().build();
    }
}