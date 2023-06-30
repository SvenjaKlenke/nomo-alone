package de.neuefische.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ControllerUserTest {

    @Autowired
    MockMvc mockMvc;


    @Test
    void addNewUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                                                            
                                                  "username": "Sve",
                                                  "name":"Test1",
                                                  "lastname":"Test1",
                                                  "email": "test",
                                                  "passwort": "123"
                                       
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
    }
}