import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.fisiomais.bodys.*;
import com.fisiomais.controller.TratamentoController;
import com.fisiomais.model.*;
import com.fisiomais.model.enums.Genero;
import com.fisiomais.model.indicators.MidiaUtilizationMetrics;
import com.fisiomais.service.TokenService;
import com.fisiomais.service.TratamentoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.naming.NoPermissionException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class TratamentoTest {

    @InjectMocks
    private TratamentoController tratamentoController;

    @Mock
    private TratamentoService tratamentoService;

    @Mock
    private TokenService tokenService;

    @Test
    void createTratamento_ShouldReturnNewTratamento() {
        NovoTratamentoRequest novoTratamentoRequest = new NovoTratamentoRequest(
                1, 2, "Tratamento de Reabilitação", "Observações do tratamento", "Feedback positivo", new Date(), 3
        );

        TratamentoResponse tratamentoResponseMock = new TratamentoResponse(
                1,
                new PacienteResponse(1, "João Silva", "joao@example.com", "11987654321", "Rua Exemplo, 123", new Date(), Genero.Homem),
                new FisioterapeutaResponse(2, "Ana Pereira", "ana@example.com", "21987654321", "Rua Teste, 321", true),
                "Tratamento de Reabilitação",
                "Observações do tratamento",
                "Feedback positivo",
                new ArrayList<>(),
                new Date(),
                new Date()
        );

        when(tratamentoService.createTratamento(any())).thenReturn(tratamentoResponseMock);

        ResponseEntity<TratamentoResponse> response = tratamentoController.createTratamento(novoTratamentoRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(tratamentoResponseMock, response.getBody());
    }

    @Test
    void findAll_ShouldReturnAllTratamentos() {
        List<Tratamento> tratamentoListMock = new ArrayList<>();
        Tratamento tratamentoMock = new Tratamento();
        tratamentoMock.setId(1);
        tratamentoListMock.add(tratamentoMock);

        when(tratamentoService.findAll()).thenReturn(tratamentoListMock);

        ResponseEntity<List<TratamentoResponse>> response = tratamentoController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void findByPacienteId_ShouldReturnTratamentos() {
        Integer pacienteId = 1;
        List<Tratamento> tratamentoListMock = new ArrayList<>();
        Tratamento tratamentoMock = new Tratamento();
        tratamentoMock.setId(1);
        tratamentoListMock.add(tratamentoMock);

        when(tratamentoService.findByPacienteId(pacienteId)).thenReturn(tratamentoListMock);

        ResponseEntity<List<TratamentoResponse>> response = tratamentoController.findByPacienteId(pacienteId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void findById_ShouldReturnTratamento() throws NoPermissionException {
        Integer tratamentoId = 1;
        Tratamento tratamentoMock = new Tratamento();
        tratamentoMock.setId(tratamentoId);
        tratamentoMock.setCreateTime(new Date());

        when(tratamentoService.findById(tratamentoId)).thenReturn(tratamentoMock);
        when(tokenService.sameUserEmail(anyString(), anyString())).thenReturn(true);

        ResponseEntity<TratamentoResponse> response = tratamentoController.findById(tratamentoId, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getTaxaUtilizacao_ShouldReturnMetrics() {
        MidiaUtilizationMetrics metricsMock = new MidiaUtilizationMetrics();
        when(tratamentoService.getTaxaUtilizacao()).thenReturn(List.of(metricsMock));

        ResponseEntity<MidiaUtilizationMetrics> response = tratamentoController.getTaxaUtilizacao();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(metricsMock, response.getBody());
    }
}
