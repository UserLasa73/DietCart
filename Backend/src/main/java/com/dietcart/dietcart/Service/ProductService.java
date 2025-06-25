package com.dietcart.dietcart.Service;

import com.dietcart.dietcart.dto.ProductDTO;
import com.dietcart.dietcart.model.DietType;
import com.dietcart.dietcart.model.Products;
import com.dietcart.dietcart.Repository.DietTypeRepository;
import com.dietcart.dietcart.Repository.ProductsRepository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductsRepository productsRepository;
    private final DietTypeRepository dietTypeRepository;

    public ProductService(ProductsRepository productsRepository,
            DietTypeRepository dietTypeRepository) {
        this.productsRepository = productsRepository;
        this.dietTypeRepository = dietTypeRepository;
    }

    public List<ProductDTO> getAllProducts() {
        return productsRepository.findAll().stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        return productsRepository.findById(id)
                .map(ProductDTO::new)
                .orElse(null);
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Products product = new Products();
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setPrice(productDTO.price());
        product.setStockQuantity(productDTO.stockQuantity());
        product.setImageUrl(productDTO.imageUrl());

        Products savedProduct = productsRepository.save(product);

        if (productDTO.dietTypeIds() != null && !productDTO.dietTypeIds().isEmpty()) {
            List<DietType> diets = dietTypeRepository.findAllById(productDTO.dietTypeIds());
            savedProduct.setDietTypes(new HashSet<>(diets));
            savedProduct = productsRepository.save(savedProduct);
        }

        return new ProductDTO(savedProduct);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        return productsRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(productDTO.name());
                    existingProduct.setDescription(productDTO.description());
                    existingProduct.setPrice(productDTO.price());
                    existingProduct.setStockQuantity(productDTO.stockQuantity());
                    existingProduct.setImageUrl(productDTO.imageUrl());

                    if (productDTO.dietTypeIds() != null) {
                        List<DietType> diets = dietTypeRepository.findAllById(productDTO.dietTypeIds());
                        existingProduct.setDietTypes(new HashSet<>(diets));
                    }

                    Products updatedProduct = productsRepository.save(existingProduct);
                    return new ProductDTO(updatedProduct);
                })
                .orElse(null);
    }

    @Transactional
    public boolean deleteProduct(Long id) {
        return productsRepository.findById(id)
                .map(product -> {
                    try {
                        String imageUrl = product.getImageUrl();
                        if (imageUrl != null && !imageUrl.isEmpty()) {
                            String filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                            Path imagePath = Paths.get("uploads/images/", filename).toAbsolutePath().normalize();
                            if (Files.exists(imagePath)) {
                                Files.delete(imagePath);
                            }
                        }
                    } catch (IOException e) {
                        System.err.println("Failed to delete image file: " + e.getMessage());
                    }

                    productsRepository.delete(product);
                    return true;
                })
                .orElse(false);
    }


    public List<ProductDTO> filterProducts(List<Long> dietTypeIds) { 
        if (dietTypeIds == null || dietTypeIds.isEmpty()) {
        return new ArrayList<>(); // Or `Collections.emptyList();`
    }

        List<Products> filteredProducts = productsRepository.findByDietTypes(dietTypeIds);
        
        // Convert to DTOs
        return filteredProducts.stream()
            .map(ProductDTO::new)
            .collect(Collectors.toList());
    }


    public List<ProductDTO> searchProducts(String query, int limit) {
        return productsRepository.findByNameContainingIgnoreCase(query)
                .stream()
                .limit(limit)
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }
    
}