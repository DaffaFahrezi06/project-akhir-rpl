package com.example.calorietracker.controller;

import com.example.calorietracker.model.User;
import com.example.calorietracker.repository.UserRepository;
import com.example.calorietracker.repository.FoodEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 


@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private FoodEntryRepository foodRepo;
    
    private final BCryptPasswordEncoder enc = new BCryptPasswordEncoder(); 

    public UserController(UserRepository userRepository, FoodEntryRepository foodRepo) {
        this.userRepository = userRepository;
        this.foodRepo = foodRepo;
    }

    // Ambil data User Lengkap (untuk Dashboard/data.js)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Hapus User
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
        	foodRepo.deleteByUserId(id); 
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Update Goal Kalori & Nutrisi (untuk limit2.js)
    @PutMapping("/{id}/goals")
    public ResponseEntity<User> updateGoals(@PathVariable Long id, @RequestBody User goalData) {
        return userRepository.findById(id).map(user -> {
            // Update kolom-kolom goal di tabel users
            user.setDailyCalorieGoal(goalData.getDailyCalorieGoal());
            user.setDailyProteinGoal(goalData.getDailyProteinGoal());
            user.setDailyCarbsGoal(goalData.getDailyCarbsGoal());
            user.setDailyFatGoal(goalData.getDailyFatGoal());
            user.setDailySugarGoal(goalData.getDailySugarGoal());
            user.setDailyHydrationGoal(goalData.getDailyHydrationGoal());
            
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }
    
    // Update Data Diri User
    @PutMapping("/{id}/bodydata")
    public ResponseEntity<User> updateBodyData(@PathVariable Long id, @RequestBody User bodyData) {
    	
        return userRepository.findById(id).map(user -> {
            // Update kolom-kolom body data di tabel users
            user.setAge(bodyData.getAge());
            user.setHeight(bodyData.getHeight());
            user.setWeight(bodyData.getWeight());
            user.setGender(bodyData.getGender());
            user.setActivityLevel(bodyData.getActivityLevel());
            user.setGoal(bodyData.getGoal());
            
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }
    
    // Update Username
    @PutMapping("/{id}/username")
    public ResponseEntity<User> updateUsername(@PathVariable Long id, @RequestBody User userData) {
    	
        return userRepository.findById(id).map(user -> {
            user.setUsername(userData.getUsername());
            
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }
    
    // Update Password
    @PutMapping("/{id}/password")
    public ResponseEntity<User> updatePassword(@PathVariable Long id, @RequestBody User userData) {
    	
        return userRepository.findById(id).map(user -> {
        	user.setPassword(enc.encode(userData.getPassword()));
            
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- Update Setting ---
    @PutMapping("/{id}/setting1")
    public ResponseEntity<User> updateSetting1(@PathVariable Long id, @RequestBody User userData) {
    	
        return userRepository.findById(id).map(user -> {
            // Update kolom-kolom setting di tabel users
            if (userData.isInputNotification() != null) {
                user.setInputNotification(userData.isInputNotification());
            }

            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/setting2")
    public ResponseEntity<User> updateSetting2(@PathVariable Long id, @RequestBody User userData) {
    	
        return userRepository.findById(id).map(user -> {
            // Update kolom-kolom setting di tabel users
            if (userData.isReminderNotification() != null) {
                user.setReminderNotification(userData.isReminderNotification());
            }

            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/setting3")
    public ResponseEntity<User> updateSetting3(@PathVariable Long id, @RequestBody User userData) {
    	
        return userRepository.findById(id).map(user -> {
            // Update kolom-kolom setting di tabel users
            if (userData.isDarkMode() != null) {
                user.setDarkMode(userData.isDarkMode());
            }

            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }).orElse(ResponseEntity.notFound().build());
    }
}