package com.doll_baby_clothing.e_commerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "carts")
public class Cart {
    @Id
    private String id; // Optional, MongoDB will auto-generate
    private String userId;
    private List<CartItem> items;
}
