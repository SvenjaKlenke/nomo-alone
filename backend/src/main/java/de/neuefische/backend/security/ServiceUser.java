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
        UserModelDTO userModel = repoUser.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
        return new User(userModel.getUsername(), userModel.getPassword(), List.of());
    }

    public UserModel addNewUser(UserModelDTO userModelDTO) {
        userModelDTO.setId(generadeUUID.getUUID());
        String hashedPassword = passwordEncoder.encode(userModelDTO.getPassword());
        userModelDTO.setPassword(hashedPassword);
        repoUser.save(userModelDTO);

        UserModel userModel = new UserModel();
        userModel.setId(userModelDTO.getId());
        userModel.setUsername(userModelDTO.getUsername());
        userModel.setName(userModelDTO.getName());
        userModel.setLastname(userModelDTO.getLastname());
        userModel.setEmail(userModelDTO.getEmail());

        return userModel;
    }
}
