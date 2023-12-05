import com.fasterxml.jackson.databind.ObjectMapper;
import com.fisiomais.bodys.ConsultaResponse;
import com.fisiomais.bodys.ConsultaResponseAgenda;
import com.fisiomais.bodys.NovaConsultaRequest;
import com.fisiomais.controller.ConsultaController;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.Consulta;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.enums.StatusConsulta;
import com.fisiomais.model.indicators.CancelationMetrics;
import com.fisiomais.model.indicators.ConfirmationMetrics;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.ConsultaService;
import com.fisiomais.util.ConsultaUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.util.NestedServletException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class ConsultaControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private ConsultaController consultaController;

    @Mock
    private ConsultaService consultaService;

    @Mock
    private ConsultaUtil consultaUtil;

    @Mock
    private FisioterapeutaRepository fisioterapeutaRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(consultaController).build();
    }

    @Test
    public void testGetAllConsultas() throws Exception {
        List<ConsultaResponseAgenda> consultas = new ArrayList<>();
        when(consultaService.toConsultaResponseAgenda(anyList())).thenReturn(consultas);

        mockMvc.perform(get("/api/consulta/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(consultaService).toConsultaResponseAgenda(anyList());
    }

    @Test
    public void testGetConsultasForDateRange() throws Exception {
        List<Consulta> consultas = new ArrayList<>();
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 1, 10);

        when(consultaService.getConsultasForDate(eq(startDate), eq(endDate))).thenReturn(consultas);

        mockMvc.perform(get("/api/consulta/date")
                        .param("startDate", "01-01-2023")
                        .param("endDate", "10-01-2023"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(consultaService).getConsultasForDate(eq(startDate), eq(endDate));
    }

    @Test
    public void testGetConsultaById() throws Exception {
        Consulta consulta = new Consulta();
        when(consultaService.getConsultaById(anyInt())).thenReturn(consulta);

        mockMvc.perform(get("/api/consulta/id/{consultaId}", 1))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").isMap());

        verify(consultaService).getConsultaById(anyInt());
    }

    @Test
    public void testGetConsultasByStatus() throws Exception {
        List<Consulta> consultas = new ArrayList<>();
        when(consultaService.getConsultasByStatus(any())).thenReturn(consultas);

        mockMvc.perform(get("/api/consulta/status/{status}", "pendente"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(consultaService).getConsultasByStatus(any());
    }

    @Test
    public void testGetConsultasByStatusInvalidStatus() throws Exception {
        mockMvc.perform(get("/api/consulta/status/{status}", "invalid_status"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(consultaService);
    }

    @Test
    public void testGetConsultasByStatusAndFisioterapeuta() throws Exception {
        List<Consulta> consultas = new ArrayList<>();
        when(consultaService.getConsultasByStatus(any())).thenReturn(consultas);
        when(fisioterapeutaRepository.findById(anyInt())).thenReturn(java.util.Optional.of(new Fisioterapeuta()));

        mockMvc.perform(get("/api/consulta/status/{status}/fisioterapeuta/{fisioterapeutaId}", "pendente", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));

        verify(consultaService).getConsultasByStatus(any());
        verify(fisioterapeutaRepository).findById(anyInt());
    }

    @Test
    public void testGetConsultasByStatusAndFisioterapeutaInvalidStatus() throws Exception {
        mockMvc.perform(get("/api/consulta/status/{status}/fisioterapeuta/{fisioterapeutaId}", "invalid_status", 1))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(consultaService);
        verifyNoInteractions(fisioterapeutaRepository);
    }

    @Test
    public void testAddConsulta() throws Exception {
        NovaConsultaRequest novaConsultaRequest = new NovaConsultaRequest(1, 2, 3, new Date());

        Consulta consulta = new Consulta();
        when(consultaUtil.convertToConsulta(any(NovaConsultaRequest.class))).thenReturn(consulta);

        when(consultaService.addConsulta(any(Consulta.class))).thenReturn(new ConsultaResponse(1, 2, new Date(), "Observações", StatusConsulta.confirmado, "Link"));

        mockMvc.perform(post("/api/consulta")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(novaConsultaRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").isMap());

        verify(consultaUtil).convertToConsulta(any(NovaConsultaRequest.class));
        verify(consultaService).addConsulta(any(Consulta.class));
    }


    @Test
    public void testAddConsultaInvalidData() throws Exception {
        NovaConsultaRequest novaConsultaRequest = new NovaConsultaRequest(null, null, null, null);

        when(consultaUtil.convertToConsulta(any(NovaConsultaRequest.class))).thenThrow(new BusinessException("Invalid data"));

        mockMvc.perform(post("/api/consulta")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(novaConsultaRequest)))
                .andExpect(status().isBadRequest());

        verify(consultaUtil).convertToConsulta(any(NovaConsultaRequest.class));
        verifyNoInteractions(consultaService);
    }


    @Test
    public void testUpdateConsultaStatus() throws Exception {
        when(consultaUtil.convertToStatusConsulta(any())).thenReturn(StatusConsulta.pendente);
        when(consultaService.updateConsultaStatus(anyInt(), any())).thenReturn(new Consulta());

        mockMvc.perform(patch("/api/consulta/status/{consultaId}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\": \"pendente\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isMap());

        verify(consultaUtil).convertToStatusConsulta(any());
        verify(consultaService).updateConsultaStatus(anyInt(), any());
    }

    @Test
    public void testUpdateConsultaStatusInvalidStatus() throws Exception {
        mockMvc.perform(patch("/api/consulta/status/{consultaId}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\": \"invalid_status\"}"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(consultaService);
    }

    @Test
    public void testDeleteConsulta() throws Exception {
        mockMvc.perform(delete("/api/consulta/{consultaId}", 1))
                .andExpect(status().isOk());

        verify(consultaService).deleteConsulta(anyInt());
    }

    @Test
    public void testGetTaxaConclusao() throws Exception {
        when(consultaService.getTaxaConclusao()).thenReturn(0.5);

        mockMvc.perform(get("/api/consulta/taxa-conclusao"))
                .andExpect(status().isOk())
                .andExpect(content().string("0.5"));

        verify(consultaService).getTaxaConclusao();
    }

    @Test
    public void testGetTaxaReagendamento() throws Exception {
        when(consultaService.getTaxaReagendamento()).thenReturn(0.3);

        mockMvc.perform(get("/api/consulta/taxa-reagendamento"))
                .andExpect(status().isOk())
                .andExpect(content().string("0.3"));

        verify(consultaService).getTaxaReagendamento();
    }

    @Test
    public void testGetTaxaConfirmacao() throws Exception {
        when(consultaService.getTaxaConfirmacao(anyInt(), anyInt())).thenReturn(new ConfirmationMetrics());

        mockMvc.perform(get("/api/consulta/taxa-confirmacao/{mes}/{ano}", 1, 2023))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isMap());

        verify(consultaService).getTaxaConfirmacao(anyInt(), anyInt());
    }

    @Test
    public void testGetTaxaConfirmacaoInvalidMonth() throws Exception {
        mockMvc.perform(get("/api/consulta/taxa-confirmacao/{mes}/{ano}", 13, 2023))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(consultaService);
    }

    @Test
    public void testGetTaxaConfirmacaoInvalidYear() throws Exception {
        mockMvc.perform(get("/api/consulta/taxa-confirmacao/{mes}/{ano}", 1, 2020))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(consultaService);
    }

    @Test
    public void testGetTaxaCancelamento() throws Exception {
        when(consultaService.getTaxaCancelamento()).thenReturn(new CancelationMetrics());

        mockMvc.perform(get("/api/consulta/taxa-cancelamento"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isMap());

        verify(consultaService).getTaxaCancelamento();
    }

    @Test
    public void testGetTaxaCancelamentoException() throws Exception {
        when(consultaService.getTaxaCancelamento()).thenThrow(new BusinessException("Invalid data"));

        mockMvc.perform(get("/api/consulta/taxa-cancelamento"))
                .andExpect(status().isBadRequest());

        verify(consultaService).getTaxaCancelamento();
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
