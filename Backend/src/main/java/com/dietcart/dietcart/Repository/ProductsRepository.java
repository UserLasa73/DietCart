package com.dietcart.dietcart.Repository;

import com.dietcart.dietcart.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}
