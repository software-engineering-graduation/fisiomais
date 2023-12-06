import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.fisiomais.bodys.ExercicioRequest;
import com.fisiomais.bodys.ExercicioResponse;
import com.fisiomais.controller.ExercicioController;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.ExercicioService;
import com.fisiomais.service.TokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

class ExercicioTest {

    @InjectMocks
    private ExercicioController exercicioController;

    @Mock
    private ExercicioService exercicioService;

    @Mock
    private FisioterapeutaRepository fisioterapeutaRepository;

    @Mock
    private TokenService tokenService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    
    @Test
    void getExercicioById_DeveRetornarExercicio() {
        Integer idExercicio = 1;
        String tokenFalso = "token-falso";
        ExercicioResponse respostaMockada = new ExercicioResponse(
                1,
                "Nome do Exercício",
                "Descrição do exercício",
                new Date(),
                Collections.emptyList(),
                true
        );
        when(exercicioService.getExercicioById(idExercicio, tokenFalso)).thenReturn(respostaMockada);

        ResponseEntity<ExercicioResponse> resposta = exercicioController.getExercicioById(idExercicio, tokenFalso);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(respostaMockada, resposta.getBody());
    }

    @Test
    void createExercicio_DeveRetornarExercicioCriado() {
        String tokenFalso = "token-falso";
        ExercicioRequest requisicao = new ExercicioRequest(
                "Nome do Exercício",
                "Descrição do exercício",
                Collections.emptyList(),
                1,
                true
        );
        ExercicioResponse respostaMockada = new ExercicioResponse(
                1,
                "Nome do Exercício",
                "Descrição do exercício",
                new Date(),
                Collections.emptyList(),
                true
        );
        when(exercicioService.createExercicio(requisicao, tokenFalso)).thenReturn(respostaMockada);

        ResponseEntity<ExercicioResponse> resposta = exercicioController.createExercicio(requisicao, tokenFalso);

        assertEquals(HttpStatus.CREATED, resposta.getStatusCode());
        assertEquals(respostaMockada, resposta.getBody());
    }

    @Test
    void deleteExercicio_DeveRetornarStatusOk() {
        List<Integer> idsParaDeletar = Arrays.asList(1, 2, 3);
        String tokenFalso = "token-falso";
        doNothing().when(exercicioService).deleteExercicio(idsParaDeletar, tokenFalso);

        ResponseEntity<Void> resposta = exercicioController.deleteExercicio(idsParaDeletar, tokenFalso);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        verify(exercicioService).deleteExercicio(idsParaDeletar, tokenFalso);
    }
}
