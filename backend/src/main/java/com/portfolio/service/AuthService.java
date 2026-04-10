package com.portfolio.service;

import com.portfolio.dto.AuthDTO;
import com.portfolio.repository.UserRepository;
import com.portfolio.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public AuthDTO.LoginResponse login(AuthDTO.LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("admin", request.getLockId())
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return new AuthDTO.LoginResponse(token, userDetails.getUsername(),
                userDetails.getAuthorities().iterator().next().getAuthority());
    }
}
