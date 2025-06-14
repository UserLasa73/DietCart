package com.dietcart.dietcart.Service;

import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.Repository.DietTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class DietTypeService {

    private final DietTypeRepository dietTypeRepository;

    public DietTypeService(DietTypeRepository dietTypeRepository) {
        this.dietTypeRepository = dietTypeRepository;
    }

    public List<DietType> getAllDietTypes() {
        return dietTypeRepository.findAll();
    }

    public Optional<DietType> getDietTypeById(Long id) {
        return dietTypeRepository.findById(id);
    }

    @Transactional
    public DietType createDietType(DietType dietType) {
        return dietTypeRepository.save(dietType);
    }

    @Transactional
    public Optional<DietType> updateDietType(Long id, DietType updatedDietType) {
        return dietTypeRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedDietType.getName());
                    existing.setDescription(updatedDietType.getDescription());
                    existing.setImageUrl(updatedDietType.getImageUrl());
                    return dietTypeRepository.save(existing);
                });
    }

    @Transactional
    public boolean deleteDietType(Long id) {
        return dietTypeRepository.findById(id)
                .map(dietType -> {
                    try {
                        String imageUrl = dietType.getImageUrl();
                        if (imageUrl != null && !imageUrl.isEmpty()) {
                            String filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                            Path imagePath = Paths.get("uploads/images/", filename).toAbsolutePath().normalize();
                            if (Files.exists(imagePath)) {
                                Files.delete(imagePath);
                            }
                        }
                    } catch (IOException e) {
                        System.err.println("Failed to delete diet type image: " + e.getMessage());
                    }
                    dietTypeRepository.delete(dietType);
                    return true;
                })
                .orElse(false);
    }
}