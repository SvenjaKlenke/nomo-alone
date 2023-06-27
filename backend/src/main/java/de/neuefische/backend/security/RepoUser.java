package de.neuefische.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepoUser extends MongoRepository<UserModelDTO, String> {
    Optional<UserModelDTO> findUserByUsername(String username);
}
