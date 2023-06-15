package de.neuefische.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    @Test
    @DirtiesContext
    void addNewTask_whenAddNewTask_then200OK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                          
                                          "creator": "Svenja",
                                          "name":"Test1",
                                          "category":"PLAYDATE",
                                          "createDate": "15.06.2023",
                                          "deadline": "16.06.2023",
                                          "amoundOfPeople": 2,
                                          "text": "Test tester Test"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                  
                                  "creator": "Svenja",
                                  "name":"Test1",
                                  "category":"PLAYDATE",
                                  "createDate": "15.06.2023",
                                  "deadline": "16.06.2023",
                                  "amoundOfPeople": 2,
                                  "text": "Test tester Test"
                        }
                        """)).andExpect(jsonPath("$.id").isNotEmpty());
    }
}