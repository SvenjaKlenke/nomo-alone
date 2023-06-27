package de.neuefische.backend.security;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public UserModel addNewUser(@RequestBody UserModelDTO userModelDTO) {
        UserModel userModel = convertToUserModel(userModelDTO);
        return serviceUser.addNewUser(userModel);
    }

    private UserModel convertToUserModel(UserModelDTO userModelDTO) {
        UserModel userModel = new UserModel();
        userModel.setId(userModelDTO.getId());
        userModel.setUsername(userModelDTO.getUsername());
        userModel.setName(userModelDTO.getName());
        userModel.setLastname(userModelDTO.getLastname());
        userModel.setEmail(userModelDTO.getEmail());
        userModel.setId(userModelDTO.getId());
        return userModel;
    }

}
