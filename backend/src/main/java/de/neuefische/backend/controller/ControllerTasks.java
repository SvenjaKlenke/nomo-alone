package de.neuefische.backend.controller;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.service.ServiceTasks;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("tasks")
@RequiredArgsConstructor
public class ControllerTasks {

    private final ServiceTasks serviceTasks;

    @GetMapping()
    public List<TaskModel> getAllTasks() {
        return serviceTasks.getAllTasks();
    }
}
