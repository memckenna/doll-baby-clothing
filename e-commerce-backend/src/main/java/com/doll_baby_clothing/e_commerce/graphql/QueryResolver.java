package com.doll_baby_clothing.e_commerce.graphql;

import com.doll_baby_clothing.e_commerce.model.CartItem;
import com.doll_baby_clothing.e_commerce.model.CartItemDetails;
import com.doll_baby_clothing.e_commerce.model.Order;
import com.doll_baby_clothing.e_commerce.model.Product;
import com.doll_baby_clothing.e_commerce.repository.OrderRepository;
import com.doll_baby_clothing.e_commerce.repository.ProductRepository;
import com.doll_baby_clothing.e_commerce.service.CartService;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class QueryResolver {
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final CartService cartService;

    // @QueryMapping
    // public List<Product> products(@Argument String search, @Argument List<String>
    // categories) {
    // List<Product> products;

    // // If category is provided, use repository method for efficiency
    // if (categories != null && !categories.isEmpty()) {
    // if (search != null && !search.isEmpty()) {
    // // Filter by both category and search
    // products = productRepo.findByCategoryIgnoreCase(categories).stream()
    // .filter(p -> p.getName() != null &&
    // p.getName().toLowerCase().contains(search.toLowerCase()))
    // .toList();
    // } else {
    // // Only category filter
    // products = productRepo.findByCategoryIgnoreCase(categories);
    // }
    // } else {
    // // No category filter
    // products = productRepo.findAll();

    // // Apply search filter if present
    // if (search != null && !search.isEmpty()) {
    // products = products.stream()
    // .filter(p -> p.getName() != null &&
    // p.getName().toLowerCase().contains(search.toLowerCase()))
    // .toList();
    // }
    // }

    // // Ensure no null category values
    // products.forEach(p -> {
    // if (p.getCategories() == null) {
    // p.setCategories(List.of("Gender Neutral"));
    // }
    // });

    // return products;
    // }

    @QueryMapping
    public List<Product> products(
            @Argument String search,
            @Argument List<String> categories,
            @Argument Boolean matchAll // optional: if true, must match all categories
    ) {
        List<Product> products;

        if (categories != null && !categories.isEmpty()) {
            // Fetch all that match ANY of the given categories
            products = productRepo.findByCategoriesIn(categories);

            // If matchAll flag is true, only keep products that contain *all* categories
            if (Boolean.TRUE.equals(matchAll)) {
                products = products.stream()
                        .filter(p -> p.getCategories() != null &&
                                categories.stream().allMatch(c -> p.getCategories().stream()
                                        .anyMatch(pc -> pc.equalsIgnoreCase(c))))
                        .toList();
            }
        } else {
            // No category filter → get everything
            products = productRepo.findAll();
        }

        // Apply search filter if provided
        if (search != null && !search.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getName() != null &&
                            p.getName().toLowerCase().contains(search.toLowerCase()))
                    .toList();
        }

        // Ensure categories are always set
        products.forEach(p -> {
            if (p.getCategories() == null || p.getCategories().isEmpty()) {
                p.setCategories(List.of("Gender Neutral"));
            }
        });

        return products;
    }

    @QueryMapping
    public List<Order> orderHistory(@Argument String userId) {
        if (userId == null || userId.isEmpty()) {
            return List.of(); // return empty list if userId not provided
        }
        return orderRepo.findAll().stream()
                .filter(o -> o.getUserId() != null && o.getUserId().equals(userId))
                .toList();
    }

    @QueryMapping
    public List<CartItemDetails> cart(@Argument String userId) {
        return cartService.getCart(userId).stream()
                .map((CartItem ci) -> {
                    var product = productRepo.findById(ci.getProductId())
                            .orElseThrow(() -> new IllegalArgumentException("Product not found: " + ci.getProductId()));

                    return new CartItemDetails(
                            ci.getProductId(),
                            product.getName(),
                            product.getPrice(),
                            product.getImageUrl(),
                            ci.getQuantity(),
                            ci.getSize());
                })
                .collect(Collectors.toList()); // 👈 force concrete List<CartItemDetails>
    }

    @QueryMapping
    public Product product(@Argument String id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found:" + id));
    }
}
