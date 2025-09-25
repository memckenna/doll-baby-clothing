package com.doll_baby_clothing.e_commerce.graphql;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.doll_baby_clothing.e_commerce.model.CartItem;
import com.doll_baby_clothing.e_commerce.model.Order;
import com.doll_baby_clothing.e_commerce.repository.OrderRepository;
import com.doll_baby_clothing.e_commerce.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MutationResolver {
    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;

    // For simplicity, store cart in memory (later we’ll persist it in MongoDB)
    private final Map<String, List<CartItem>> userCarts = new HashMap<>();

    @MutationMapping
    public List<CartItem> addToCart(
            @Argument String userId,
            @Argument String productId,
            @Argument int quantity) {
        var cart = userCarts.getOrDefault(userId, new ArrayList<>());
        cart.add(new CartItem(productId, quantity));
        userCarts.put(userId, cart);
        return cart;
    }

    @MutationMapping
    public Order checkout(@Argument String userId) {
        List<CartItem> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        double total = cart.stream()
                .mapToDouble(ci -> productRepo.findById(ci.getProductId())
                        .orElseThrow().getPrice() * ci.getQuantity())
                .sum();

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(cart);
        order.setTotalPrice(total);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("COMPLETED");

        orderRepo.save(order);
        userCarts.remove(userId);
        return order;
    }

    @MutationMapping
    public Order updateOrderStatus(@Argument String orderId, @Argument String status) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order ID not found: " + orderId));
        order.setStatus(status);
        return orderRepo.save(order);
    }
}
