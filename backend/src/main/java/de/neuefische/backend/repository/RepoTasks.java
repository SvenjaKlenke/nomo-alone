package de.neuefische.backend.repository;

import de.neuefische.backend.model.TaskModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoTasks extends MongoRepository<TaskModel, String> {

}
