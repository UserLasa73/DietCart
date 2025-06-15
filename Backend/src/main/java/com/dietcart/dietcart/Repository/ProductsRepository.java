package com.dietcart.dietcart.Repository;

import com.dietcart.dietcart.model.Products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductsRepository extends JpaRepository<Products, Long> {
    @Query("SELECT DISTINCT p FROM Products p JOIN p.dietTypes d WHERE " +
            "(:dietTypeIds IS NULL OR d.id IN :dietTypeIds)")
    List<Products> findByDietTypes(@Param("dietTypeIds") List<Long> dietTypeIds);
}
