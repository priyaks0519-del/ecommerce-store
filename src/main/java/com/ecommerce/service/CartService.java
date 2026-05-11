package com.ecommerce.service;

import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.dto.CartItemResponse;
import com.ecommerce.dto.CartResponse;
import com.ecommerce.exception.AppException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;

    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public CartResponse getCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException("Cart not found", HttpStatus.NOT_FOUND));

        return buildCartResponse(cart);
    }

    public void addToCart(User user, CartItemRequest request) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException("Cart not found", HttpStatus.NOT_FOUND));

        Product product = productService.getProductEntity(request.getProductId());

        // Check if product already in cart
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setPrice(product.getPrice());
            cartItemRepository.save(cartItem);
        }
    }

    public void updateCartItem(User user, Long cartItemId, Integer quantity) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException("Cart not found", HttpStatus.NOT_FOUND));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new AppException("Cart item not found", HttpStatus.NOT_FOUND));

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }

    public void removeFromCart(User user, Long cartItemId) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException("Cart not found", HttpStatus.NOT_FOUND));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new AppException("Cart item not found", HttpStatus.NOT_FOUND));

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
    }

    public void clearCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException("Cart not found", HttpStatus.NOT_FOUND));
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public BigDecimal getCartTotal(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException("Cart not found", HttpStatus.NOT_FOUND));

        return cart.getItems().stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private CartResponse buildCartResponse(Cart cart) {
        var items = cart.getItems().stream()
                .map(item -> new CartItemResponse(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getTotalPrice()
                ))
                .collect(Collectors.toSet());

        BigDecimal totalPrice = items.stream()
                .map(CartItemResponse::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setItems(items);
        response.setTotalPrice(totalPrice);
        response.setTotalItems(items.size());
        return response;
    }
}