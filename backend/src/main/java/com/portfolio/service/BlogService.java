package com.portfolio.service;

import com.portfolio.dto.BlogDTO;
import com.portfolio.model.Blog;
import com.portfolio.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
    }

    public Blog createBlog(BlogDTO dto) {
        Blog blog = Blog.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        return blogRepository.save(blog);
    }

    public Blog updateBlog(Long id, BlogDTO dto) {
        Blog blog = getBlogById(id);
        blog.setTitle(dto.getTitle());
        blog.setContent(dto.getContent());
        return blogRepository.save(blog);
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}
