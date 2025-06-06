package com.dietcart.dietcart.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer stockQuantity;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "products_diet_types",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "diet_type_id")
    )
    private Set<DietType> dietTypes = new HashSet<>();


    // -------------------------------
    // Constructors
    // -------------------------------
    public Products() {
        // No-args constructor (required by JPA)
    }

    public Products(String name, String description, BigDecimal price, 
                   Integer stockQuantity, String imageUrl, Set<DietType> dietTypes) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.dietTypes = dietTypes;
    }

    // -------------------------------
    // Getters
    // -------------------------------
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    // -------------------------------
    // Setters
    // -------------------------------
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public Set<DietType> getDietTypes() { return dietTypes; }
    public void setDietTypes(Set<DietType> dietTypes) { this.dietTypes = dietTypes; }

    
    // -------------------------------
    // toString() (Optional but useful for debugging)
    // -------------------------------
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", stockQuantity=" + stockQuantity +
                '}';
    }
}