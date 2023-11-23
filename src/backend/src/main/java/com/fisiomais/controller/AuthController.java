package com.fisiomais.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fisiomais.dto.Login;
import com.fisiomais.model.User;
import com.fisiomais.service.GoogleCalendarService;
import com.fisiomais.service.TokenService;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private static final Logger logger = LogManager.getLogger(AuthController.class);

    public AuthController(AuthenticationManager authenticationManager,
            TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Login login) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    login.getEmail(), login.getSenha());

            Authentication authenticated = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            User user = (User) authenticated.getPrincipal();

            logger.info("User " + user.getEmail() + " logged in");
            String token = tokenService.gerarToken(user);
            logger.info("Token generated for user " + user.getEmail() + ": " + token);

            // Retorna um ResponseEntity com o token
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (TokenExpiredException e) {
            // Trata a exceção específica de token expirado
            logger.error("Token expired: " + e.getMessage());
            return new ResponseEntity<>("Token expirado. Faça login novamente.", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            // Trata outras exceções
            logger.error("Error while logging in: " + e.getMessage());
            return new ResponseEntity<>("Erro durante o login. Verifique suas credenciais.",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
