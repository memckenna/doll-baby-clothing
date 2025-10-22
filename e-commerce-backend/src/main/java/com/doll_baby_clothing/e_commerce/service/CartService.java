package com.doll_baby_clothing.e_commerce.service;

import com.doll_baby_clothing.e_commerce.model.Cart;
import com.doll_baby_clothing.e_commerce.model.CartItem;
import com.doll_baby_clothing.e_commerce.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public List<CartItem> getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .map(Cart::getItems)
                .orElse(new ArrayList<>());
    }

    public List<CartItem> addToCart(String userId, String productId, int quantity, String size) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);
        List<CartItem> items = cart.getItems();
        if (items == null) items = new ArrayList<>();

        // Check if product is already in cart
        boolean found = false;
        for (CartItem ci : items) {
            if (ci.getProductId().equals(productId) && Objects.equals(ci.getSize(), size)) {
                ci.setQuantity(ci.getQuantity() + quantity);
                found = true;
                break;
            }
        }
        if (!found) {
            items.add(new CartItem(productId, quantity, size));
        }

        cart.setItems(items);
        cartRepository.save(cart);
        return items;
    }

    public List<CartItem> updateQuantity(String userId, String productId, int newQuantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user: " + userId));

        List<CartItem> items = cart.getItems();
        if (items == null) items = new ArrayList<>();

        items.removeIf(ci -> ci.getQuantity() <= 0); // safety cleanup

        for (Iterator<CartItem> it = items.iterator(); it.hasNext();) {
            CartItem ci = it.next();
            if (ci.getProductId().equals(productId)) {
                if (newQuantity <= 0) {
                    it.remove(); // remove if 0 or less
                } else {
                    ci.setQuantity(newQuantity);
                }
                break;
            }
        }

        cart.setItems(items);
        cartRepository.save(cart);
        return items;
    }

    public List<CartItem> removeFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user: " + userId));

        List<CartItem> items = cart.getItems();
        if (items != null) {
            items.removeIf(ci -> ci.getProductId().equals(productId));
        }

        cart.setItems(items);
        cartRepository.save(cart);
        return items;
    }

    public void clearCart(String userId) {
        cartRepository.findByUserId(userId).ifPresent(cartRepository::delete);
    }


}
