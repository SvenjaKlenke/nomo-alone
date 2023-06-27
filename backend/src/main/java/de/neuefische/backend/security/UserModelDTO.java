package de.neuefische.backend.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModelDTO {

    private String id;
    private String username;
    private String name;
    private String lastname;
    private String email;

}
