package de.neuefische.backend.controller;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.service.ServiceTasks;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        serviceTasks.deleteById(id);
    }
}
