package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.TaskModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ControllerTasksTest {

    @Autowired
    MockMvc mockMvc;


    @Test
    @WithMockUser(username = "user", password = "123")
    void getAllTasks_returnAllTasksAsList_andStatusCode200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
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
                                """)
                        .with(csrf()))
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

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void deleteTask_thenReturn200OK_andReturnEmptyList() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/tasks")
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
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        TaskModel taskModel = objectMapper.readValue(content, TaskModel.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/tasks/" + taskModel.getId())
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void editTask_thenReturn200OK_andReturnTheEditTask() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/tasks")
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
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        TaskModel taskModel = objectMapper.readValue(content, TaskModel.class);

        mockMvc.perform(MockMvcRequestBuilders.put("/tasks/" + taskModel.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                                  
                                                  "id": "<id>",                          
                                                  "creator": "Svenja",
                                                  "name":"Test1",
                                                  "category":"PLAYDATE",
                                                  "createDate": "15.06.2023",
                                                  "deadline": "16.06.2023",
                                                  "amoundOfPeople": 1,
                                                  "text": "Test tester Test"
                                }
                                """.replace("<id>", taskModel.getId()))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                                                            
                                                  "creator": "Svenja",
                                                  "name":"Test1",
                                                  "category":"PLAYDATE",
                                                  "createDate": "15.06.2023",
                                                  "deadline": "16.06.2023",
                                                  "amoundOfPeople": 1,
                                                  "text": "Test tester Test"
                                }
                        """));

    }
}
