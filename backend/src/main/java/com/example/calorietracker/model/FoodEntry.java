package com.example.calorietracker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "food_entries")
public class FoodEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    private String foodName;
    private Double amount;
    
    @JsonProperty("calorie")
    @Column(name = "calories")
    private Double calorie;
    
    @JsonProperty("carb")
    @Column(name = "carbs")
    private Double carb;
    private Double fat;
    private Double sugar;
    private Double protein;
    private Double water = 0.0;
    
    @Column(name = "date")
    private LocalDateTime entryDate;

    @PrePersist
    protected void onCreate() {
        this.entryDate = LocalDateTime.now();
    }

    // Getters
    public Long getId() { 
    	return id; 
    }
     
    public Long getUserId() { 
    	return userId; 
    }
    
    public String getFoodName() {
    	return foodName; 
    }
    
    public Double getAmount() { 
    	return amount;
    }
    
    public Double getCalorie() { 
    	return calorie; 
    }
    
    public Double getCarb() { 
    	return carb; 
    }
    
    public Double getFat() { 
    	return fat; 
    } 
    
    public Double getSugar() { 
    	return sugar; 
    }
    
    public Double getProtein() { 
    	return protein; 
    }

    public Double getWater() { 
    	return water; 
    }
    
    public LocalDateTime getEntryDate() { 
    	return entryDate; 
    }
    

    // Setters
    public void setId(Long id) { 
    	this.id = id; 
    }
    
    public void setUserId(Long userId) { 
    	this.userId = userId; 
    }
    
    public void setFoodName(String foodName) { 
    	this.foodName = foodName; 
    }
    
    
    public void setAmount(Double amount) { 
    	this.amount = amount; 
    }
    
    public void setCalorie(Double calorie) { 
    	this.calorie = calorie; 
    }
    
    public void setCarb(Double carb) { 
    	this.carb = carb; 
    }
    
    public void setFat(Double fat) { 
    	this.fat = fat; 
    }
    
    public void setSugar(Double sugar) { 
    	this.sugar = sugar; 
    }
    
    public void setProtein(Double protein) { 
    	this.protein = protein; 
    }

    public void setWater(Double water) { 
    	this.water = water; 
    }
    
    public void setEntryDate(LocalDateTime entryDate) {
    	this.entryDate = entryDate; 
    }
    
    
}