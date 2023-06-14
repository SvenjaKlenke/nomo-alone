package de.neuefische.backend.service;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.model.category;
import de.neuefische.backend.repository.RepoTasks;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ServiceTasksTest {

    RepoTasks repoTasks = mock(RepoTasks.class);

    TaskModel taskModel1 = new TaskModel(
            "1",
            "Svenja",
            category.PLAYDATE,
            "Skat",
            "12.06.2023",
            "15.06.2023",
            3,
            "This ist a Test!"
    );

    TaskModel taskModel2 = new TaskModel(
            "2",
            "Amelie",
            category.PLAYDATE,
            "Schach",
            "12.06.2023",
            "15.06.2023",
            2,
            "This ist a Test, too!"
    );

    ServiceTasks serviceTasks = new ServiceTasks(repoTasks);

    @Test
    void getAllTasks_shouldReturnAListOfAllTasks() {
        //GIVEN
        when(repoTasks.findAll()).thenReturn(List.of(taskModel1));
        //WHEN
        List<TaskModel> actual = serviceTasks.getAllTasks();

        //THEN
        verify(repoTasks).findAll();
        assertEquals(actual, List.of(taskModel1));
    }

}