package com.dietcart.dietcart.dto;

import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.model.Products;
import java.math.BigDecimal;
import java.util.List;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private List<String> dietTypes; // Just diet type names
    
    // Constructor converts Entity → DTO
    public ProductDTO(Products product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stockQuantity = product.getStockQuantity();
        this.dietTypes = product.getDietTypes().stream()
                .map(DietType::getName)
                .toList();
    }
    
    // Getters (NO setters for immutability)
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public Integer getStockQuantity() { return stockQuantity; }
    public List<String> getDietTypes() { return dietTypes; }
}
