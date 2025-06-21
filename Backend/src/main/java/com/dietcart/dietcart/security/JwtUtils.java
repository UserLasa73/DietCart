package com.dietcart.dietcart.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.security.Key;

@Component
public class JwtUtils {

    // You can replace this key with a secure value from application.properties
    private final Key jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long jwtExpirationMs = 86400000; // 24 hours

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("role", userPrincipal.getAuthorities().iterator().next().getAuthority())
                .claim("id", userPrincipal.getId())
                .claim("name", userPrincipal.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(jwtSecret)
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(jwtSecret).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("JWT validation error: " + e.getMessage());
        }
        return false;
    }
}
