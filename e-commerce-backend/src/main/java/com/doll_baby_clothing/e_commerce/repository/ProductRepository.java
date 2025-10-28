package com.doll_baby_clothing.e_commerce.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.doll_baby_clothing.e_commerce.model.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    // List<Product> findByCategory(String category);

    List<Product> findByCategoriesIn(List<String> categories);

    // (Optional alternative if you sometimes filter by one category)
    // List<Product> findByCategoriesIgnoreCase(String category);
}
