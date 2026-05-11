package com.ecommerce.dto;

import com.ecommerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer quantity;
    private String category;
    private String sku;
    private String imageUrl;
    private LocalDateTime createdAt;
    private Boolean isActive;

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.category = product.getCategory();
        this.sku = product.getSku();
        this.imageUrl = product.getImageUrl();
        this.createdAt = product.getCreatedAt();
        this.isActive = product.getIsActive();
    }
}