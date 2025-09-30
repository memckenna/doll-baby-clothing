package com.doll_baby_clothing.e_commerce.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    private String userId;
    private List<CartItemDetails> items;
    private double totalPrice;
    private LocalDateTime createdAt;
    private String status; // PENDING, COMPLETED, CANCELLED
}
