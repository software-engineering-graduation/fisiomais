import com.fisiomais.bodys.AgendaResponse;
import com.fisiomais.bodys.FisioterapeutaResponse;
import com.fisiomais.controller.AgendaController;
import com.fisiomais.dto.AgendaRequest;
import com.fisiomais.model.Agenda;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.service.AgendaService;
import com.fisiomais.service.FisioterapeutaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Time;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class AgendaTest {

    @Mock
    private AgendaService agendaService;

    @Mock
    private FisioterapeutaService fisioterapeutaService;

    @InjectMocks
    private AgendaController agendaController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(agendaController).build();
    }

    @Test
    public void getAgendasByFisioterapeutaTest() throws Exception {
        Time sampleTimeInicio = Time.valueOf("09:00:00");
        Time sampleTimeFim = Time.valueOf("10:00:00");

        FisioterapeutaResponse fisioterapeutaResponse = new FisioterapeutaResponse(1, "Nome", "email@example.com", "123456789", "Endereço", true);

        AgendaResponse agendaResponse1 = new AgendaResponse(1, true, (byte) 1, sampleTimeInicio, sampleTimeFim, fisioterapeutaResponse);
        AgendaResponse agendaResponse2 = new AgendaResponse(2, false, (byte) 2, sampleTimeInicio, sampleTimeFim, fisioterapeutaResponse);
        List<AgendaResponse> agendas = Arrays.asList(agendaResponse1, agendaResponse2);

        when(agendaService.getAgendasByFisioterapeuta(eq(1))).thenReturn(agendas);

        mockMvc.perform(get("/api/agenda/fisioterapeuta/{fisioterapeutaId}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].disponivel").value(true))
                .andExpect(jsonPath("$[0].dia").value(1))
                .andExpect(jsonPath("$[0].horarioInicio").value("09:00:00"))
                .andExpect(jsonPath("$[0].horarioFim").value("10:00:00"))
                .andExpect(jsonPath("$[0].fisioterapeuta.id").value(1))
                .andExpect(jsonPath("$[0].fisioterapeuta.nome").value("Nome"))
                .andExpect(jsonPath("$[0].fisioterapeuta.email").value("email@example.com"))
                .andExpect(jsonPath("$[0].fisioterapeuta.telefone").value("123456789"))
                .andExpect(jsonPath("$[0].fisioterapeuta.endereco").value("Endereço"))
                .andExpect(jsonPath("$[0].fisioterapeuta.automatic").value(true))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].disponivel").value(false))
                .andExpect(jsonPath("$[1].fisioterapeuta.id").value(1))
                .andExpect(jsonPath("$[1].fisioterapeuta.nome").value("Nome"))
                .andExpect(jsonPath("$[1].fisioterapeuta.email").value("email@example.com"))
                .andExpect(jsonPath("$[1].fisioterapeuta.telefone").value("123456789"))
                .andExpect(jsonPath("$[1].fisioterapeuta.endereco").value("Endereço"))
                .andExpect(jsonPath("$[1].fisioterapeuta.automatic").value(true));

        verify(agendaService).getAgendasByFisioterapeuta(eq(1));
    }


    @Test
    public void getAgendasByDiaAndFisioterapeutaTest() throws Exception {
        List<Agenda> agendas = Arrays.asList(new Agenda(), new Agenda());
        when(agendaService.getAgendasByDiaAndFisioterapeuta(anyByte(), anyInt())).thenReturn(agendas);

        mockMvc.perform(get("/api/agenda/fisioterapeuta/{fisioterapeutaId}/dia/{dia}", 1, (byte) 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(agendas.size())));

        verify(agendaService).getAgendasByDiaAndFisioterapeuta(anyByte(), anyInt());
    }

    @Test
    public void getAgendasByDisponibilidadeAndFisioterapeutaTest() throws Exception {
        List<Agenda> agendas = Arrays.asList(new Agenda(), new Agenda());
        when(agendaService.getAgendasByDisponibilidadeAndFisioterapeuta(anyBoolean(), anyInt())).thenReturn(agendas);

        mockMvc.perform(get("/api/agenda/fisioterapeuta/{fisioterapeutaId}/disponibilidade", 1)
                        .param("disponivel", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(agendas.size())));

        verify(agendaService).getAgendasByDisponibilidadeAndFisioterapeuta(anyBoolean(), anyInt());
    }

    @Test
    public void getAgendasByFisioterapeutaDiaEHorarioTest() throws Exception {
        List<Agenda> agendas = Arrays.asList(new Agenda(), new Agenda());
        when(agendaService.getAgendasByFisioterapeutaDiaEHorario(anyInt(), anyByte(), any(Time.class), any(Time.class))).thenReturn(agendas);

        mockMvc.perform(get("/api/agenda/fisioterapeuta/{fisioterapeutaId}/dia/{dia}/horario", 1, (byte) 1)
                        .param("horarioInicio", "08:00:00")
                        .param("horarioFim", "10:00:00"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(agendas.size())));

        verify(agendaService).getAgendasByFisioterapeutaDiaEHorario(anyInt(), anyByte(), any(Time.class), any(Time.class));
    }

    @Test
    public void getAgendasDisponiveisByFisioterapeutaAndDiaTest() throws Exception {
        List<Agenda> agendas = Arrays.asList(new Agenda(), new Agenda());
        when(agendaService.getAgendasDisponiveisByFisioterapeutaAndDia(anyInt(), anyByte(), anyBoolean())).thenReturn(agendas);

        mockMvc.perform(get("/api/agenda/fisioterapeuta/{fisioterapeutaId}/dia/{dia}/disponivel", 1, (byte) 1)
                        .param("disponivel", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(agendas.size())));

        verify(agendaService).getAgendasDisponiveisByFisioterapeutaAndDia(anyInt(), anyByte(), anyBoolean());
    }

    @Test
    public void createAgendaTest() throws Exception {
        String jsonAgendaRequest = """
        {
            "dia": 2,
            "horarioInicio": "09:00:00",
            "horarioFim": "10:00:00",
            "disponivel": true,
            "fisioterapeutaId": 1
        }
        """;

        Agenda agenda = new Agenda();
        agenda.setDia((byte) 2);
        agenda.setHorarioInicio(Time.valueOf("09:00:00"));
        agenda.setHorarioFim(Time.valueOf("10:00:00"));
        agenda.setDisponivel(true);

        Fisioterapeuta fisioterapeuta = new Fisioterapeuta();
        fisioterapeuta.setId(1);
        agenda.setFisioterapeuta(fisioterapeuta);

        when(fisioterapeutaService.findById(1)).thenReturn(Optional.of(fisioterapeuta));
        when(agendaService.saveAgenda(any(Agenda.class))).thenReturn(agenda);

        mockMvc.perform(post("/api/agenda")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonAgendaRequest))
                .andExpect(status().isOk());

        verify(fisioterapeutaService).findById(1);
        verify(agendaService).saveAgenda(any(Agenda.class));
    }

    @Test
    public void updateAgendaTest() throws Exception {
        String jsonUpdatedAgenda = """
        {
            "dia": 3,
            "horarioInicio": "11:00:00",
            "horarioFim": "12:00:00",
            "disponivel": false
        }
        """;

        Agenda existingAgenda = new Agenda();
        existingAgenda.setId(1);
        existingAgenda.setDia((byte) 1);
        existingAgenda.setHorarioInicio(Time.valueOf("09:00:00"));
        existingAgenda.setHorarioFim(Time.valueOf("10:00:00"));
        existingAgenda.setDisponivel(true);

        Agenda updatedAgenda = new Agenda();
        updatedAgenda.setId(1);
        updatedAgenda.setDia((byte) 3);
        updatedAgenda.setHorarioInicio(Time.valueOf("11:00:00"));
        updatedAgenda.setHorarioFim(Time.valueOf("12:00:00"));
        updatedAgenda.setDisponivel(false);

        when(agendaService.getAgendaById(1)).thenReturn(existingAgenda);
        when(agendaService.updateAgenda(any(Agenda.class))).thenReturn(updatedAgenda);

        mockMvc.perform(put("/api/agenda/{agendaId}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonUpdatedAgenda))
                .andExpect(status().isOk());

        verify(agendaService).getAgendaById(1);
        verify(agendaService).updateAgenda(any(Agenda.class));
    }

    @Test
    public void getAgendaByIdTest() throws Exception {
        Agenda agenda = new Agenda();
        agenda.setId(1);
        agenda.setDia((byte) 2);
        agenda.setHorarioInicio(Time.valueOf("09:00:00"));
        agenda.setHorarioFim(Time.valueOf("10:00:00"));
        agenda.setDisponivel(true);

        when(agendaService.getAgendaById(1)).thenReturn(agenda);

        mockMvc.perform(get("/api/agenda/{agendaId}", 1))
                .andExpect(status().isOk());

        verify(agendaService).getAgendaById(1);
    }

    @Test
    public void deleteAgendaTest() throws Exception {
        doNothing().when(agendaService).deleteAgenda(anyInt());

        mockMvc.perform(delete("/api/agenda/{agendaId}", 1))
                .andExpect(status().isOk());

        verify(agendaService).deleteAgenda(anyInt());
    }
}
