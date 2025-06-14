package com.dietcart.dietcart.Controller;

import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.Repository.DietTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    // Get a single diet type by ID
    @GetMapping("/{id}")
    public ResponseEntity<DietType> getDietTypeById(@PathVariable Long id) {
        Optional<DietType> dietType = dietTypeRepository.findById(id);
        return dietType.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new diet type
    @PostMapping
    public DietType createDietType(@RequestBody DietType dietType) {
        return dietTypeRepository.save(dietType);
    }

    // Update an existing diet type
    @PutMapping("/{id}")
    public ResponseEntity<DietType> updateDietType(
            @PathVariable Long id,
            @RequestBody DietType updatedDietType) {

        return dietTypeRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedDietType.getName());
                    existing.setDescription(updatedDietType.getDescription());
                    existing.setImageUrl(updatedDietType.getImageUrl());
                    return ResponseEntity.ok(dietTypeRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a diet type
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDietType(@PathVariable Long id) {
        return dietTypeRepository.findById(id)
                .map(dietType -> {
                    // Delete image file if it exists
                    try {
                        String imageUrl = dietType.getImageUrl();
                        if (imageUrl != null && !imageUrl.isEmpty()) {
                            String filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                            Path imagePath = Paths.get("uploads/images/", filename).toAbsolutePath().normalize();

                            if (Files.exists(imagePath)) {
                                Files.delete(imagePath);
                                System.out.println("Deleted image file: " + imagePath);
                            }
                        }
                    } catch (IOException e) {
                        System.err.println("Failed to delete diet type image: " + e.getMessage());
                        // Optional: you can choose to still delete DB entry or stop here
                    }

                    // Delete diet type from DB
                    dietTypeRepository.delete(dietType);
                    System.out.println("Deleted diet type with ID: " + id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> {
                    System.out.println("Diet type not found with ID: " + id);
                    return ResponseEntity.notFound().build();
                });
    }
}
