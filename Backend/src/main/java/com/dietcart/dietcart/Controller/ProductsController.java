package com.dietcart.dietcart.Controller;

import com.dietcart.dietcart.Repository.DietTypeRepository;
import com.dietcart.dietcart.Repository.ProductsRepository;
import com.dietcart.dietcart.dto.ProductDTO;
import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.model.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.io.IOException;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")

public class ProductsController {
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private DietTypeRepository dietTypeRepository;

    // Get all
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productsRepository.findAll().stream()
                .map(ProductDTO::new) // Convert each Product to ProductDTO
                .toList();
    }

    // Get Single
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        return productsRepository.findById(id)
                .map(ProductDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        Products product = new Products();
        // Map DTO to entity
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setPrice(productDTO.price());
        product.setStockQuantity(productDTO.stockQuantity());
        product.setImageUrl(productDTO.imageUrl());
        // diet types??

        Products savedProduct = productsRepository.save(product); // Save first to get ID for updating product-diet
                                                                  // table

        // 2. Handle diet type associations
        if (productDTO.dietTypeIds() != null && !productDTO.dietTypeIds().isEmpty()) {
            List<DietType> diets = dietTypeRepository.findAllById(productDTO.dietTypeIds());
            savedProduct.setDietTypes(new HashSet<>(diets));
            productsRepository.save(savedProduct); // Update with associations
        }

        return ResponseEntity.ok(new ProductDTO(savedProduct));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO) {

        return productsRepository.findById(id)
                .map(existingProduct -> {
                    // Update fields
                    existingProduct.setName(productDTO.name());
                    existingProduct.setDescription(productDTO.description());
                    existingProduct.setPrice(productDTO.price());
                    existingProduct.setStockQuantity(productDTO.stockQuantity());
                    existingProduct.setImageUrl(productDTO.imageUrl());
                    // Diet types?????

                    if (productDTO.dietTypeIds() != null) {
                        List<DietType> diets = dietTypeRepository.findAllById(productDTO.dietTypeIds());
                        existingProduct.setDietTypes(new HashSet<>(diets));
                    }

                    Products updatedProduct = productsRepository.save(existingProduct);
                    return ResponseEntity.ok(new ProductDTO(updatedProduct));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productsRepository.findById(id)
                .map(product -> {
                    // Delete the image file if it exists
                    try {
                        String imageUrl = product.getImageUrl();
                        if (imageUrl != null && !imageUrl.isEmpty()) {
                            // Better URL to filename conversion
                            String filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

                            // Use proper path resolution (adjust "uploads/images/" to your actual path)
                            Path imagePath = Paths.get("uploads/images/", filename).toAbsolutePath().normalize();

                            if (Files.exists(imagePath)) {
                                Files.delete(imagePath);
                                System.out.println("Deleted image file: " + imagePath);
                            }
                        }
                    } catch (IOException e) {
                        System.err.println("Failed to delete image file: " + e.getMessage());
                        // You might want to handle this differently
                    }

                    // Delete product from DB
                    productsRepository.delete(product);
                    System.out.println("Deleted product with ID: " + id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> {
                    System.out.println("Product not found with ID: " + id);
                    return ResponseEntity.notFound().build();
                });
    }

}
