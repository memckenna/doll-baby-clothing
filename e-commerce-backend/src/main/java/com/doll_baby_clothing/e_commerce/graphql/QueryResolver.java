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
    public List<Product> products(@Argument String search) {
        if (search != null && !search.isEmpty()) {
            return productRepo.findAll().stream()
                .filter(p -> p.getName().toLowerCase().contains(search.toLowerCase()))
                .toList();
        }
        return productRepo.findAll();
    }

    @QueryMapping
    public List<Order> orderHistory(@Argument String userId) {
        return orderRepo.findAll().stream()
                .filter(o -> o.getUserId().equals(userId))
                .toList();
    }
}
