package de.neuefische.backend.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModelRequest {

    private String username;
    private String name;
    private String lastname;
    private String email;
    private String password;
}
