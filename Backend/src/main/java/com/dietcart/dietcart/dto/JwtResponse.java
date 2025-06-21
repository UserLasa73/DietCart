package com.dietcart.dietcart.dto;

public class JwtResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;

    public JwtResponse(String token, Long id, String name, String email, String role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Getters
    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
}
