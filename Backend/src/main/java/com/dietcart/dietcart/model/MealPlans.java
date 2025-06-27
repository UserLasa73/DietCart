package com.dietcart.dietcart.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "meal_plans")
public class MealPlans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diet_type_id")
    private DietType dietType;

    private String name;
    private String description;

    @Column(columnDefinition = "TEXT[]")
    private List<String> items;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Constructors
    public MealPlans() {}

    public MealPlans(DietType dietType, String name, String description, List<String> items) {
        this.dietType = dietType;
        this.name = name;
        this.description = description;
        this.items = items;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public DietType getDietType() { return dietType; }
    public void setDietType(DietType dietType) { this.dietType = dietType; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getItems() { return items; }
    public void setItems(List<String> items) { this.items = items; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Convenience method to get diet type ID
    public Long getDietTypeId() {
        return this.dietType != null ? this.dietType.getId() : null;
    }
}