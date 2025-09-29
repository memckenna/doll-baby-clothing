package com.doll_baby_clothing.e_commerce.graphql;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.doll_baby_clothing.e_commerce.model.CartItem;
import com.doll_baby_clothing.e_commerce.model.CartItemDetails;
import com.doll_baby_clothing.e_commerce.model.Order;
import com.doll_baby_clothing.e_commerce.model.Product;
import com.doll_baby_clothing.e_commerce.repository.OrderRepository;
import com.doll_baby_clothing.e_commerce.repository.ProductRepository;
import com.doll_baby_clothing.e_commerce.service.CartService;

import lombok.RequiredArgsConstructor;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MutationResolver {
    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final CartService cartService;

    // For simplicity, store cart in memory (later we’ll persist it in MongoDB)
    private final Map<String, List<CartItem>> userCarts = new HashMap<>();

    @MutationMapping
    public List<CartItemDetails> addToCart(@Argument String userId,
                                           @Argument String productId,
                                           @Argument int quantity) {
        List<CartItem> items = cartService.addToCart(userId, productId, quantity);
        return items.stream()
                .map(ci -> {
                    var product = productRepo.findById(ci.getProductId()).orElseThrow();
                    return new CartItemDetails(ci.getProductId(), product.getName(), product.getPrice(), productId, ci.getQuantity());
                })
                .toList();
    }


    @MutationMapping
    public Order checkout(@Argument String userId) {
        List<CartItem> cartItems = cartService.getCart(userId);
        double total = cartItems.stream()
                .mapToDouble(ci -> productRepo.findById(ci.getProductId()).orElseThrow().getPrice() * ci.getQuantity())
                .sum();

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(cartItems);
        order.setTotalPrice(total);
        order.setCreatedAt(java.time.LocalDateTime.now());
        order.setStatus("COMPLETED");

        orderRepo.save(order);
        cartService.clearCart(userId);
        return order;
    }

    @MutationMapping
    public Order updateOrderStatus(@Argument String orderId, @Argument String status) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order ID not found: " + orderId));
        order.setStatus(status);
        return orderRepo.save(order);
    }

    @MutationMapping
    public Product addProduct(
            @Argument String name,
            @Argument String description,
            @Argument double price,
            @Argument String imageUrl,
            @Argument String category) {

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImageUrl(imageUrl);
        product.setCategory(category);

        return productRepo.save(product);
    }

    @MutationMapping
    public Product updateProduct(
            @Argument String id,
            @Argument String name,
            @Argument String description,
            @Argument Double price,
            @Argument String imageUrl,
            @Argument String category) {

        Product product = productRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));

        if (name != null)
            product.setName(name);
        if (description != null)
            product.setDescription(description);
        if (price != null)
            product.setPrice(price);
        if (imageUrl != null)
            product.setImageUrl(imageUrl);
        if (category != null)
            product.setCategory(category);

        return productRepo.save(product);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument String id) {
        if (!productRepo.existsById(id)) {
            throw new IllegalArgumentException("Product not found: " + id);
        }
        productRepo.deleteById(id);
        return true;
    }

}
