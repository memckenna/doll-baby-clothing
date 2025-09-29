package com.doll_baby_clothing.e_commerce.repository;

import com.doll_baby_clothing.e_commerce.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserId(String userId);
}
