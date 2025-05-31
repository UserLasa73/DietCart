package com.dietcart.dietcart.Repository;

import com.dietcart.dietcart.model.DietType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface DietTypeRepository extends JpaRepository<DietType, Long> {

    // Basic query methods
    Optional<DietType> findByName(String name);
    
    // Find multiple diet types by ID
    @Query("SELECT dt FROM DietType dt WHERE dt.id IN :ids")
    List<DietType> findAllById(Set<Long> ids);
    
    // Custom query to check existence
    boolean existsByName(String name);
}
