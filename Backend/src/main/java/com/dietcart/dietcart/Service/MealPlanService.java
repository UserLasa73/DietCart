package com.dietcart.dietcart.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dietcart.dietcart.Repository.MealPlanRepository;
import com.dietcart.dietcart.model.MealPlans;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class MealPlanService {
    private final MealPlanRepository mealPlanRepository;

    public MealPlanService(MealPlanRepository mealPlanRepository) {
        this.mealPlanRepository = mealPlanRepository;
    }

    public List<MealPlans> getAllMealPlans() {
        return mealPlanRepository.findAll(); // Fetch all meal plans
    }

    // public List<MealPlans> getMealPlansByDietType(Long dietTypeId) {
    //     return mealPlanRepository.findByDietTypeId(dietTypeId);
    // }

    public List<MealPlans> searchMealPlans(String query) {
        return mealPlanRepository.findByNameContainingIgnoreCase(query);
    }

    public MealPlans getMealPlanById(Long id) {
        return mealPlanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meal plan not found"));
    }


    public List<MealPlans> findByDietTypeId(Long dietTypeId) {
        if (dietTypeId == null) {
            throw new IllegalArgumentException("DietType ID cannot be null");
        }
        return mealPlanRepository.findByDietTypeId(dietTypeId);
    }

    @Transactional
public MealPlans createMealPlan(MealPlans request) {
    // The dietType proxy is already set via setDietTypeId()
    if (request.getItems() == null || request.getItems().isEmpty()) {
        throw new IllegalArgumentException("Items cannot be empty");
    }
    return mealPlanRepository.save(request);
}

@Transactional
public MealPlans updateMealPlan(Long id, MealPlans mealPlanDetails) {
    return mealPlanRepository.findById(id)
            .map(existingPlan -> {
                // Update basic fields
                if (mealPlanDetails.getName() != null) {
                    existingPlan.setName(mealPlanDetails.getName());
                }
                if (mealPlanDetails.getDescription() != null) {
                    existingPlan.setDescription(mealPlanDetails.getDescription());
                }

                // Update items with validation
                if (mealPlanDetails.getItems() != null) {
                    if (mealPlanDetails.getItems().isEmpty()) {
                        throw new IllegalArgumentException("Must have at least one item");
                    }
                    existingPlan.setItems(mealPlanDetails.getItems());
                }

                // NEW: Handle dietTypeId instead of dietType object
                if (mealPlanDetails.getDietTypeId() != null) {
                    existingPlan.setDietTypeId(mealPlanDetails.getDietTypeId());
                }

                return mealPlanRepository.save(existingPlan);
            })
            .orElseThrow(() -> new RuntimeException("Meal plan not found with id: " + id));
}

    public void deleteMealPlan(Long id) {
        if (!mealPlanRepository.existsById(id)) {
            throw new RuntimeException("Meal plan not found with id: " + id);
        }
        mealPlanRepository.deleteById(id);
    }
}
