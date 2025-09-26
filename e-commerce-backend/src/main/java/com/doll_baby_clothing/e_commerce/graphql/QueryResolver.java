package com.doll_baby_clothing.e_commerce.graphql;

import com.doll_baby_clothing.e_commerce.model.Order;
import com.doll_baby_clothing.e_commerce.model.Product;
import com.doll_baby_clothing.e_commerce.repository.OrderRepository;
import com.doll_baby_clothing.e_commerce.repository.ProductRepository;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class QueryResolver {
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;

    @QueryMapping
    public List<Product> products(@Argument String search, @Argument String category) {
        List<Product> products;

        // If category is provided, use repository method for efficiency
        if (category != null && !category.isEmpty()) {
            if (search != null && !search.isEmpty()) {
                // Filter by both category and search
                products = productRepo.findByCategoryIgnoreCase(category).stream()
                        .filter(p -> p.getName() != null &&
                                p.getName().toLowerCase().contains(search.toLowerCase()))
                        .toList();
            } else {
                // Only category filter
                products = productRepo.findByCategoryIgnoreCase(category);
            }
        } else {
            // No category filter
            products = productRepo.findAll();

            // Apply search filter if present
            if (search != null && !search.isEmpty()) {
                products = products.stream()
                        .filter(p -> p.getName() != null &&
                                p.getName().toLowerCase().contains(search.toLowerCase()))
                        .toList();
            }
        }

        // Ensure no null category values
        products.forEach(p -> {
            if (p.getCategory() == null) {
                p.setCategory("Gender Neutral");
            }
        });

        return products;

        // // If category is provided, use repository method for efficiency
        // if (category != null && !category.isEmpty()) {
        // if (search != null && !search.isEmpty()) {
        // // Filter by both category and search
        // return productRepo.findByCategoryIgnoreCase(category).stream()
        // .filter(p -> p.getName() != null &&
        // p.getName().toLowerCase().contains(search.toLowerCase()))
        // .toList();
        // } else {
        // // Only category filter
        // return productRepo.findByCategoryIgnoreCase(category);
        // }
        // }

        // // No category filter
        // List<Product> products = productRepo.findAll();

        // // Apply search filter if present
        // if (search != null && !search.isEmpty()) {
        // products = products.stream()
        // .filter(p -> p.getName() != null &&
        // p.getName().toLowerCase().contains(search.toLowerCase()))
        // .toList();
        // }

        // return products;
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
}
