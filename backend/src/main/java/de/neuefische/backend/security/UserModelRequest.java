package de.neuefische.backend.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModelRequest {

    @NotEmpty
    @Size(min = 4, max = 20)
    private String username;
    @NotEmpty
    @Pattern(regexp = "\\D")
    private String name;
    @NotEmpty
    private String lastname;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    @Size(min = 8)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    private String password;
}
