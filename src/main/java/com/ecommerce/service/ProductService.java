package com.ecommerce.service;

import com.ecommerce.dto.ProductRequest;
import com.ecommerce.dto.ProductResponse;
import com.ecommerce.exception.AppException;
import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.findBySku(request.getSku()).isPresent()) {
            throw new AppException("SKU already exists", HttpStatus.CONFLICT);
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setCategory(request.getCategory());
        product.setSku(request.getSku());
        product.setImageUrl(request.getImageUrl());

        product = productRepository.save(product);
        return new ProductResponse(product);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("Product not found with id: " + id, HttpStatus.NOT_FOUND));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        product = productRepository.save(product);
        return new ProductResponse(product);
    }

    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("Product not found with id: " + id, HttpStatus.NOT_FOUND));
        return new ProductResponse(product);
    }

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByIsActiveTrue(pageable);
        return new PageImpl<>(products.stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList()), pageable, products.getTotalElements());
    }

    public Page<ProductResponse> searchProducts(String name, Pageable pageable) {
        Page<Product> products = productRepository.findByNameContainingIgnoreCase(name, pageable);
        return new PageImpl<>(products.stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList()), pageable, products.getTotalElements());
    }

    public Page<ProductResponse> getProductsByCategory(String category, Pageable pageable) {
        Page<Product> products = productRepository.findByCategory(category, pageable);
        return new PageImpl<>(products.stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList()), pageable, products.getTotalElements());
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("Product not found with id: " + id, HttpStatus.NOT_FOUND));
        product.setIsActive(false);
        productRepository.save(product);
    }

    public Product getProductEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new AppException("Product not found with id: " + id, HttpStatus.NOT_FOUND));
    }
}