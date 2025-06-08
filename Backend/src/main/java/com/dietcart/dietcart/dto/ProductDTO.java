package com.dietcart.dietcart.dto;

import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.model.Products;
import java.math.BigDecimal;
import java.util.List;

public record ProductDTO(
    Long id,                  // null for new products, populated for responses
    String name,
    String description,
    BigDecimal price,
    Integer stockQuantity,
    String imageUrl,
    List<String> dietTypes,    // null for incoming, populated for outgoing
    List<Long> dietTypeIds
) {
    // Constructor for INCOMING data (create/update)
    public ProductDTO(String name, String description, BigDecimal price, 
                    Integer stockQuantity, String imageUrl, List<Long> dietTypeIds) {
        this(null, name, description, price, stockQuantity, imageUrl, null, dietTypeIds);
    }
    
    // Constructor for OUTGOING data (responses)
    public ProductDTO(Products product) {
        this(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getStockQuantity(),
            product.getImageUrl(),
            product.getDietTypes().stream()
                .map(DietType::getName)
                .toList(),
            product.getDietTypes().stream()  // Add dietTypeIds for outgoing
                .map(DietType::getId)
                .toList()
        );
    }
}