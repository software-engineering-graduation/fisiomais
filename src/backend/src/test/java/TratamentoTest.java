import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;

import com.fisiomais.bodys.*;
import com.fisiomais.controller.TratamentoController;
import com.fisiomais.model.*;
import com.fisiomais.model.enums.Genero;
import com.fisiomais.model.indicators.MidiaUtilizationMetrics;
import com.fisiomais.service.TokenService;
import com.fisiomais.service.TratamentoService;

import util.JsonUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.naming.NoPermissionException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Date;

@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
class TratamentoTest {

    @Mock
    private MockMvc mockMvc;

    @InjectMocks
    private TratamentoController tratamentoController;

    @Mock
    private TratamentoService tratamentoService;

    @Mock
    private TokenService tokenService;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(tratamentoController).build();
    }

    @Test
    void findAll_ShouldReturnAllTratamentos() throws Exception {
        List<Tratamento> tratamentoListMock = new ArrayList<>();
        Paciente pacienteMock = new Paciente();
        pacienteMock.setId(1);
        Fisioterapeuta fisioterapeutaMock = new Fisioterapeuta();
        fisioterapeutaMock.setId(1);
        Tratamento tratamentoMock = new Tratamento();
        tratamentoMock.setId(1);
        tratamentoMock.setPaciente(pacienteMock);
        tratamentoMock.setFisioterapeuta(fisioterapeutaMock);
        tratamentoMock.setCreateTime(new Date());
        tratamentoMock.setExercicios(new ArrayList<>());

        tratamentoListMock.add(tratamentoMock);

        when(tratamentoService.findAll()).thenReturn(tratamentoListMock);

        mockMvc.perform(get("/api/tratamento")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> assertTrue(result.getResponse().getContentAsString().startsWith("[")))
                .andExpect(result -> assertTrue(result.getResponse().getContentAsString().endsWith("]")));
    }

    @Test
    void findByPacienteId_ShouldReturnTratamentos() {
        Integer pacienteId = 1;
        List<Tratamento> tratamentoListMock = new ArrayList<>();
        Paciente pacienteMock = new Paciente();
        pacienteMock.setId(pacienteId);
        Fisioterapeuta fisioterapeutaMock = new Fisioterapeuta();
        fisioterapeutaMock.setId(1);
        Tratamento tratamentoMock = new Tratamento();
        tratamentoMock.setId(1);
        tratamentoMock.setPaciente(pacienteMock);
        tratamentoMock.setFisioterapeuta(fisioterapeutaMock);
        tratamentoMock.setCreateTime(new Date());
        tratamentoMock.setExercicios(new ArrayList<>());

        tratamentoListMock.add(tratamentoMock);

        when(tratamentoService.findByPacienteId(pacienteId)).thenReturn(tratamentoListMock);

        ResponseEntity<List<TratamentoResponse>> response = tratamentoController.findByPacienteId(pacienteId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tratamentoListMock.size(), response.getBody().size());
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
