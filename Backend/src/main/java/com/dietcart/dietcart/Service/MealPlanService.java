package com.dietcart.dietcart.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dietcart.dietcart.Repository.MealPlanRepository;
import com.dietcart.dietcart.model.MealPlans;

@Service
public class MealPlanService {
    private final MealPlanRepository mealPlanRepository;

    public MealPlanService(MealPlanRepository mealPlanRepository) {
        this.mealPlanRepository = mealPlanRepository;
    }

    public List<MealPlans> getAllMealPlans() {
        return mealPlanRepository.findAll(); // Fetch all meal plans
    }

    public List<MealPlans> getMealPlansByDietType(Long dietTypeId) {
        return mealPlanRepository.findByDietTypeId(dietTypeId);
    }

    public MealPlans createMealPlan(MealPlans mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    public MealPlans updateMealPlan(Long id, MealPlans mealPlanDetails) {
        MealPlans mealPlan = mealPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal plan not found with id: " + id));

        if (mealPlanDetails.getName() != null) {
            mealPlan.setName(mealPlanDetails.getName());
        }

        if (mealPlanDetails.getDescription() != null) {
            mealPlan.setDescription(mealPlanDetails.getDescription());
        }

        if (mealPlanDetails.getItems() != null) {
            mealPlan.setItems(mealPlanDetails.getItems());
        }

        if (mealPlanDetails.getDietType() != null) {
            mealPlan.setDietType(mealPlanDetails.getDietType());
        }
        return mealPlanRepository.save(mealPlan);
    }

    public void deleteMealPlan(Long id) {
        mealPlanRepository.deleteById(id);
    }
}
