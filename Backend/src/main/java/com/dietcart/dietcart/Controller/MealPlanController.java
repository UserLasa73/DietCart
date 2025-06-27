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
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/search")
    public ResponseEntity<List<MealPlans>> searchMealPlans(@RequestParam String query) {
        return ResponseEntity.ok(mealPlanService.searchMealPlans(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlans> getMealPlanById(@PathVariable Long id) {
        MealPlans mealPlan = mealPlanService.getMealPlanById(id);
        return ResponseEntity.ok(mealPlan);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<MealPlans>> filterMealPlans(
            @RequestParam(required = false) Long dietTypeId,
            @RequestParam(required = false) String name) {

        if (dietTypeId != null) {
            return ResponseEntity.ok(mealPlanService.findByDietTypeId(dietTypeId));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<MealPlans> createMealPlan(@RequestBody MealPlans request) {
        // Spring will now properly bind dietTypeId from JSON
        return ResponseEntity.ok(mealPlanService.createMealPlan(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealPlans> updateMealPlan(
            @PathVariable Long id,
            @RequestBody MealPlans request) {
        return ResponseEntity.ok(mealPlanService.updateMealPlan(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mealPlanService.deleteMealPlan(id);
        return ResponseEntity.noContent().build();
    }
}