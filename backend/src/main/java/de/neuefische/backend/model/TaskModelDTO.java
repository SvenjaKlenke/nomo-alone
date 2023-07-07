package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskModelDTO {
    private String id;
    private String creator;
    private Category category;
    private String name;
    private String createDate;
    private String deadline;
    private int amoundOfPeople;
    private String text;
    private String assignee;
}
