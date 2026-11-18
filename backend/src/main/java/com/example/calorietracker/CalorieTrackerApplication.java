package com.example.calorietracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CalorieTrackerApplication {
 public static void main(String[] args){
  SpringApplication.run(CalorieTrackerApplication.class,args);
 }
}
