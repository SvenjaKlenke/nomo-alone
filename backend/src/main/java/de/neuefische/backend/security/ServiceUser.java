package de.neuefische.backend.security;

import de.neuefische.backend.service.GeneradeUUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceUser implements UserDetailsService {
    private final RepoUser repoUser;
    private final GeneradeUUID generadeUUID;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = repoUser.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
        return new User(userModel.getUsername(), userModel.getPassword(), List.of());
    }

    public UserModelDTO addNewUser(UserModelRequest userModelRequest) {
        UserModel userModel = new UserModel();
        userModel.setId(generadeUUID.getUUID());
        userModel.setUsername(userModelRequest.getUsername());
        userModel.setName(userModelRequest.getName());
        userModel.setLastname(userModelRequest.getLastname());
        userModel.setEmail(userModelRequest.getEmail());
        String hashedPassword = passwordEncoder.encode(userModelRequest.getPassword());
        userModel.setPassword(hashedPassword);
        userModelRequest.setPassword(hashedPassword);
        repoUser.save(userModel);

        UserModelDTO userModelDTO = new UserModelDTO();
        userModelDTO.setId(userModel.getId());
        userModelDTO.setUsername(userModel.getUsername());
        userModelDTO.setName(userModel.getName());
        userModelDTO.setLastname(userModel.getLastname());
        userModelDTO.setEmail(userModel.getEmail());

        return userModelDTO;
    }
}
