package de.neuefische.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepoUser extends MongoRepository<UserModel, String> {
    Optional<UserModel> findUserByUsername(String username);

    Optional<UserModel> findUserByEmail(String email);
}
