package de.neuefische.backend.security;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ControllerUser {

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
}
