package de.neuefische.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ControllerTasksTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void getAllTasks_returnAllTasksAsList_andStatusCode200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}