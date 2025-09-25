package com.doll_baby_clothing.e_commerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.doll_baby_clothing.e_commerce.model.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {}
