package com.dietcart.dietcart.Controller;

import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.Service.DietTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diet-types")
@CrossOrigin(origins = "http://localhost:5173")
public class DietTypeController {

    private final DietTypeService dietTypeService;

    public DietTypeController(DietTypeService dietTypeService) {
        this.dietTypeService = dietTypeService;
    }

    @GetMapping
    public ResponseEntity<List<DietType>> getAllDietTypes() {
        return ResponseEntity.ok(dietTypeService.getAllDietTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DietType> getDietTypeById(@PathVariable Long id) {
        Optional<DietType> dietType = dietTypeService.getDietTypeById(id);
        return dietType.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DietType> createDietType(@RequestBody DietType dietType) {
        return ResponseEntity.ok(dietTypeService.createDietType(dietType));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DietType> updateDietType(
            @PathVariable Long id,
            @RequestBody DietType updatedDietType) {
        
        Optional<DietType> updated = dietTypeService.updateDietType(id, updatedDietType);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDietType(@PathVariable Long id) {
        boolean deleted = dietTypeService.deleteDietType(id);
        return deleted ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }
}