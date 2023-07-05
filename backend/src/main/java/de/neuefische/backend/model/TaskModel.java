package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("Tasks")
public class TaskModel {
    @Id
    private String id;
    private String creator;
    private Category category;
    private String name;
    private String createDate;
    private String deadline;
    private int amoundOfPeople;
    private String text;
}
