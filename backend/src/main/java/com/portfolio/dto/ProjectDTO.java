package com.portfolio.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectDTO {
    private String title;
    private String description;
    private List<String> techStack;
    private String githubLink;
    private String liveLink;
}
