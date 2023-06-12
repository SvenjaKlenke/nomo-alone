package de.neuefische.backend.service;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.model.category;
import de.neuefische.backend.repository.RepoTasks;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceTasksTest {

    RepoTasks repoTasks = mock(RepoTasks.class);

    TaskModel taskModel = new TaskModel(
            "1",
            "Svenja",
            category.PLAYDATE,
            "Skat",
            "12.06.2023",
            "15.06.2023",
            3,
            "This ist a Test!"
    );

    ServiceTasks serviceTasks = new ServiceTasks(repoTasks);

    @Test
    void getAllTasks_shouldReturnAListOfAllTasks() {
        //GIVEN
        when(repoTasks.findAll()).thenReturn(List.of(taskModel));
        //WHEN
        List<TaskModel> actual = serviceTasks.getAllTasks();

        //THEN
        verify(repoTasks).findAll();
        assertEquals(actual, List.of(taskModel));
    }
}