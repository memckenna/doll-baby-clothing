package com.doll_baby_clothing.e_commerce.service;

import com.doll_baby_clothing.e_commerce.model.Cart;
import com.doll_baby_clothing.e_commerce.model.CartItem;
import com.doll_baby_clothing.e_commerce.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public List<CartItem> getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .map(Cart::getItems)
                .orElse(new ArrayList<>());
    }

    public List<CartItem> addToCart(String userId, String productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);
        List<CartItem> items = cart.getItems();
        if (items == null) items = new ArrayList<>();

        // Check if product is already in cart
        boolean found = false;
        for (CartItem ci : items) {
            if (ci.getProductId().equals(productId)) {
                ci.setQuantity(ci.getQuantity() + quantity);
                found = true;
                break;
            }
        }
        if (!found) {
            items.add(new CartItem(productId, quantity));
        }

        cart.setItems(items);
        cartRepository.save(cart);
        return items;
    }

    public void clearCart(String userId) {
        cartRepository.findByUserId(userId).ifPresent(cartRepository::delete);
    }
}
