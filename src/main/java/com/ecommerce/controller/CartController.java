package com.ecommerce.controller;

import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.dto.CartResponse;
import com.ecommerce.security.CurrentUser;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@CurrentUser User user) {
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@CurrentUser User user, @Valid @RequestBody CartItemRequest request) {
        cartService.addToCart(user, request);
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(@CurrentUser User user, @PathVariable Long cartItemId, @RequestParam Integer quantity) {
        cartService.updateCartItem(user, cartItemId, quantity);
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<CartResponse> removeFromCart(@CurrentUser User user, @PathVariable Long cartItemId) {
        cartService.removeFromCart(user, cartItemId);
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@CurrentUser User user) {
        cartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getCartTotal(@CurrentUser User user) {
        return ResponseEntity.ok(cartService.getCartTotal(user));
    }
}