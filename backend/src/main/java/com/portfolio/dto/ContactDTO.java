package com.portfolio.dto;

import lombok.Data;

@Data
public class ContactDTO {
    private String name;
    private String email;
    private String subject;
    private String message;
}
