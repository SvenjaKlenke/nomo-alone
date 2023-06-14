package de.neuefische.backend.service;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.repository.RepoTasks;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ServiceTasks {

    private final RepoTasks repoTasks;

    public List<TaskModel> getAllTasks() {
        return repoTasks.findAll();
    }

    public void deleteById(String id) {
        repoTasks.deleteById(id);
    }
}
