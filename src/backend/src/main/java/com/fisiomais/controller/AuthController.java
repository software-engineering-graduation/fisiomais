package com.fisiomais.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fisiomais.bodys.UserCredentialsResponse;
import com.fisiomais.dto.Login;
import com.fisiomais.exception.NotFoundException;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Paciente;
import com.fisiomais.model.User;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.repository.PacienteRepository;
import com.fisiomais.service.GoogleCalendarService;
import com.fisiomais.service.TokenService;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private static final Logger logger = LogManager.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PacienteRepository pacienteRepository;
    private final FisioterapeutaRepository fisioterapeutaRepository;

    public AuthController(AuthenticationManager authenticationManager,
            TokenService tokenService,
            PacienteRepository pacienteRepository,
            FisioterapeutaRepository fisioterapeutaRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.pacienteRepository = pacienteRepository;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
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

    @GetMapping("/credentials/{id}")
    public ResponseEntity<UserCredentialsResponse> getCredentials(@PathVariable Integer id) {
        logger.info("Getting credentials for user with id: {}", id);

        // check if the id requested is the same as the authenticated user
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (!authenticatedUser.getId().equals(id)) {
            logger.error("User {} is not authorized to get credentials for user with id: {}", authenticatedUser.getId(),
                    id);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Paciente paciente = pacienteRepository.findById(id).orElse(null);
        if (paciente != null) {
            return new ResponseEntity<>(UserCredentialsResponse.parsePaciente(paciente), HttpStatus.OK);
        }

        Fisioterapeuta fisioterapeuta = fisioterapeutaRepository.findById(id).orElse(null);
        if (fisioterapeuta != null) {
            return new ResponseEntity<>(UserCredentialsResponse.parseFisioterapeuta(fisioterapeuta), HttpStatus.OK);
        }

        logger.error("User not found for id: {}", id);
        throw new NotFoundException();
    }

}
