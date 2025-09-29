package com.doll_baby_clothing.e_commerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemDetails {
    private String productId;
    private String name;
    private double price;
    private String imageUrl;
    private int quantity;
}
