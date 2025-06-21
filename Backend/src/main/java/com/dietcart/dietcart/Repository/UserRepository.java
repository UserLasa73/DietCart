package com.dietcart.dietcart.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dietcart.dietcart.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    
    Boolean existsByEmail(String email);
}
