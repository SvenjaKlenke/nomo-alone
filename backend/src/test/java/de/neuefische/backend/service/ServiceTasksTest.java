package de.neuefische.backend.service;

import de.neuefische.backend.model.Category;
import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.repository.RepoTasks;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ServiceTasksTest {

    RepoTasks repoTasks = mock(RepoTasks.class);
    GeneradeUUID generadeUUID = new GeneradeUUID();

    TaskModel taskModel1 = new TaskModel(
            "1",
            "Svenja",
            Category.PLAYDATE,
            "Skat",
            "12.06.2023",
            "15.06.2023",
            3,
            "This ist a Test!"
    );



    ServiceTasks serviceTasks = new ServiceTasks(generadeUUID, repoTasks);

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

    @Test
    void deleteById_verify() {
        // GIVEN
        String taskId = "123";

        // WHEN
        serviceTasks.deleteById(taskId);

        // THEN
        verify(repoTasks).deleteById(taskId);
    }

    @Test
    void addNewTask_returnTheTaskModel() {
        //GIVEN
        when(repoTasks.save(taskModel1)).thenReturn(taskModel1);
        //WHEN
        TaskModel actual = serviceTasks.addNewTask(taskModel1);
        //THEN
        assertEquals(taskModel1, actual);
        verify(repoTasks).save(taskModel1);
    }

    @Test
    void editTask_returnTheNewTaskModel() {
        //GIVEN
        when(repoTasks.save(taskModel1)).thenReturn(taskModel1);
        //WHEN
        TaskModel actual = serviceTasks.editTask(taskModel1);
        //THEN
        assertEquals(taskModel1, actual);
        verify(repoTasks).save(taskModel1);
    }

}