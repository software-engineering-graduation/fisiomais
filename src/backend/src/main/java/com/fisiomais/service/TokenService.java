package com.fisiomais.service;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fisiomais.model.User;

@Service
public class TokenService {
    public String gerarToken(User usuario) {
        return JWT
                .create()
                .withIssuer("Produtos")
                .withSubject(usuario.getUsername())
                .withClaim("id", usuario.getId())
                .sign(Algorithm.HMAC256("fisiomais_secret_jwt"));
    }

    public String getSubject(String token) {
        return JWT
                .require(Algorithm
                        .HMAC256("fisiomais_secret_jwt"))
                .withIssuer("Users")
                .build()
                .verify(token)
                .getSubject();

    }
}
