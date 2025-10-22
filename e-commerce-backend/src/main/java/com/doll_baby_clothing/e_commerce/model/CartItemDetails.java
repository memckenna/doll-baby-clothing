package com.doll_baby_clothing.e_commerce.model;

import java.util.List;

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
    private String size;

    //size and color
}
