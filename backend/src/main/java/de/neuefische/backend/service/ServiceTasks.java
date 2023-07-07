package de.neuefische.backend.service;

import de.neuefische.backend.model.TaskModel;
import de.neuefische.backend.model.TaskModelDTO;
import de.neuefische.backend.repository.RepoTasks;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ServiceTasks {

    private final GeneradeUUID generadeUUID;
    private final RepoTasks repoTasks;

    public List<TaskModel> getAllTasks() {
        return repoTasks.findAll();
    }

    public TaskModel addNewTask(TaskModel taskModel) {
        taskModel.setId(generadeUUID.getUUID());
        return repoTasks.save(taskModel);
    }

    public void deleteById(String id) {
        repoTasks.deleteById(id);
    }

    public TaskModel editTask(TaskModelDTO taskModelDTO) {
        TaskModel taskModel = new TaskModel();

        return repoTasks.save(taskModel);
    }


}
