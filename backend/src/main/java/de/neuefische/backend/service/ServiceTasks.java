package de.neuefische.backend.service;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.repository.RepoTasks;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class ServiceTasks {

    private final RepoTasks repoTasks;

    public List<TaskModel> getAllTasks() {
        return repoTasks.findAll();
    }

    public void deleteById(String id) {
        Optional<TaskModel> task = repoTasks.findById(id);
        if (task.isPresent()) {
            repoTasks.deleteById(id);
        } else {
            throw new NoSuchElementException("Task not found");
        }
    }

}
