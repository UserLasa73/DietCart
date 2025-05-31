package com.dietcart.dietcart.Controller;

import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.Repository.DietTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diet-types")
@CrossOrigin(origins = "http://localhost:5173") // adjust frontend port if needed
public class DietTypeController {

    @Autowired
    private DietTypeRepository dietTypeRepository;

    // Get all diet types
    @GetMapping
    public List<DietType> getAllDietTypes() {
        return dietTypeRepository.findAll();
    }

    //Get a single diet type by ID
    @GetMapping("/{id}")
    public ResponseEntity<DietType> getDietTypeById(@PathVariable Long id) {
        Optional<DietType> dietType = dietTypeRepository.findById(id);
        return dietType.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Create a new diet type
    @PostMapping
    public DietType createDietType(@RequestBody DietType dietType) {
        return dietTypeRepository.save(dietType);
    }

    //Update an existing diet type
    @PutMapping("/{id}")
    public ResponseEntity<DietType> updateDietType(
            @PathVariable Long id,
            @RequestBody DietType updatedDietType) {

        return dietTypeRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedDietType.getName());
                    existing.setDescription(updatedDietType.getDescription());
                    return ResponseEntity.ok(dietTypeRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //Delete a diet type
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDietType(@PathVariable Long id) {
        if (dietTypeRepository.existsById(id)) {
            dietTypeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
