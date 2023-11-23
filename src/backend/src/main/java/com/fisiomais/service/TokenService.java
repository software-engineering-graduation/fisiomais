package com.fisiomais.service;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fisiomais.model.User;

@Service
public class TokenService {
    private final String secretKey = "fisiomais_secret_jwt";

    public String gerarToken(User usuario) {
        return JWT.create()
                .withIssuer("User")
                .withSubject(usuario.getUsername())
                .withClaim("id", usuario.getId())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String getSubject(String token) {
        return JWT.require(Algorithm.HMAC256(secretKey))
                .withIssuer("Users")
                .build()
                .verify(token)
                .getSubject();
    }
}
