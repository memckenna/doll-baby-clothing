package com.doll_baby_clothing.e_commerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.doll_baby_clothing.e_commerce.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {}
