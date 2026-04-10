package com.portfolio.dto;

import lombok.Data;

public class AuthDTO {

    @Data
    public static class LoginRequest {
        private String lockId;
    }

    @Data
    public static class LoginResponse {
        private String token;
        private String username;
        private String role;

        public LoginResponse(String token, String username, String role) {
            this.token = token;
            this.username = username;
            this.role = role;
        }
    }
}
