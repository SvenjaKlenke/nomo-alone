package de.neuefische.backend.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("User")
public class UserModelDTO {

    private String id;
    private String username;
    private String name;
    private String lastname;
    private String email;
    private String password;


}