package com.portfolio.config;

import com.portfolio.model.User;
import com.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${admin.lockId}")
    private String adminLockId;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .lockId(passwordEncoder.encode(adminLockId))
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Admin user seeded with lockId: " + adminLockId);
        }
    }
}
