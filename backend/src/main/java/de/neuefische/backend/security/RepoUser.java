package de.neuefische.backend.security;

import org.springframework.stereotype.Repository;

@Repository
public class RepoUser extends MongoRepository<UserModel, String> {
    Optional<UserModel> findUserByUsername(String username);
}
