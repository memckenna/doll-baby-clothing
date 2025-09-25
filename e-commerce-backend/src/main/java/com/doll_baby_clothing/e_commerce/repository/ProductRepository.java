package com.doll_baby_clothing.e_commerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doll_baby_clothing.e_commerce.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {}
