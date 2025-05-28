package com.dietcart.dietcart.Controller;

import com.dietcart.dietcart.Repository.ProductsRepository;
import com.dietcart.dietcart.dto.ProductDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")

public class ProductsController {
    @Autowired
    private ProductsRepository productsRepository;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productsRepository.findAll().stream()
                .map(ProductDTO::new) // Convert each Product to ProductDTO
                .toList();
    }
}
