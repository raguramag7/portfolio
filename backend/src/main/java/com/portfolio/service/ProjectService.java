package com.portfolio.service;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project createProject(ProjectDTO dto) {
        Project project = Project.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .techStack(dto.getTechStack())
                .githubLink(dto.getGithubLink())
                .liveLink(dto.getLiveLink())
                .build();
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, ProjectDTO dto) {
        Project project = getProjectById(id);
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setTechStack(dto.getTechStack());
        project.setGithubLink(dto.getGithubLink());
        project.setLiveLink(dto.getLiveLink());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
