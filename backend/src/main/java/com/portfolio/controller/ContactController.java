package com.portfolio.controller;

import com.portfolio.dto.ContactDTO;
import com.portfolio.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactDTO dto) {
        try {
            contactService.saveMessage(dto);
            return ResponseEntity.ok(Map.of("message", "Message sent successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
