package de.neuefische.backend.security;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ControllerUser {

    private final ServiceUser serviceUser;

    @GetMapping("/me")
    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/login")
    public void login() {
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logged out";
    }

    @PostMapping("/register")
    public ResponseEntity<?> addNewUser(@Valid @RequestBody UserModelRequest userModelRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError error : fieldErrors) {
                if (error.getField().equals("email") && Objects.equals(error.getCode(), "email")) {
                    String errorMessage = "Email address does not have a valid format.";
                    bindingResult.rejectValue("email", error.getCode(), errorMessage);
                }
                if (error.getField().equals("password") && Objects.equals(error.getCode(), "password")) {
                    String errorMessage = "Password must have at least 8 characters, including uppercase and lowercase letters, at least one number, and one special character.";
                    bindingResult.rejectValue("password", error.getCode(), errorMessage);
                }
            }
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        UserModelDTO userModelDTO = serviceUser.addNewUser(userModelRequest);
        return ResponseEntity.ok(userModelDTO);
    }


}
