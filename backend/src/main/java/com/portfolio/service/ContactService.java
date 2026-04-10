package com.portfolio.service;


import com.portfolio.dto.ContactDTO;
import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public ContactMessage saveMessage(ContactDTO dto) {
        ContactMessage msg = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();
        return contactMessageRepository.save(msg);
    }
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }
}
