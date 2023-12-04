
import com.fisiomais.controller.AcompanhamentoVirtualController;
import com.fisiomais.model.AcompanhamentoVirtual;
import com.fisiomais.service.AcompanhamentoService;
import com.fisiomais.service.interfaces.AcompanhamentoInterface;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class AcompanhamentoTest {
    @Mock
    private AcompanhamentoService acompanhamentoService;

    @InjectMocks
    private AcompanhamentoVirtualController acompanhamentoVirtualController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(acompanhamentoVirtualController).build();
    }

    @Test
    public void criarAcompanhamentoTest() throws Exception {
        String jsonNovoAcompanhamento = "{\"data_sessao\": \"2023-12-04T10:00:00Z\"," +
                "\"plataforma\": \"Zoom\"," +
                "\"recursos\": \"Video, Chat\"," +
                "\"feedback\": \"Sessão muito produtiva\"," +
                "\"avaliacao\": 5}";

        AcompanhamentoVirtual acompanhamentoSalvo = new AcompanhamentoVirtual();
        acompanhamentoSalvo.setId(1L);

        when(acompanhamentoService.salvar(any(AcompanhamentoVirtual.class))).thenReturn(acompanhamentoSalvo);

        mockMvc.perform(post("/api/acompanhamento")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonNovoAcompanhamento))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)));

        verify(acompanhamentoService).salvar(any(AcompanhamentoVirtual.class));
    }


    @Test
    public void listarTodosTest() throws Exception {
        List<AcompanhamentoVirtual> acompanhamentos = Arrays.asList(new AcompanhamentoVirtual(), new AcompanhamentoVirtual());

        when(acompanhamentoService.buscarTodos()).thenReturn(acompanhamentos);

        mockMvc.perform(get("/api/acompanhamento"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));

        verify(acompanhamentoService).buscarTodos();
    }

    @Test
    public void buscarPorIdTest() throws Exception {
        Long id = 1L;
        AcompanhamentoVirtual acompanhamento = new AcompanhamentoVirtual();
        acompanhamento.setId(id);

        when(acompanhamentoService.buscarPorId(id)).thenReturn(Optional.of(acompanhamento));

        mockMvc.perform(get("/api/acompanhamento/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));

        verify(acompanhamentoService).buscarPorId(id);
    }

    @Test
    public void atualizarAcompanhamentoTest() throws Exception {
        Long id = 1L;
        AcompanhamentoVirtual acompanhamentoAtualizado = new AcompanhamentoVirtual();
        acompanhamentoAtualizado.setId(id);

        when(acompanhamentoService.atualizar(eq(id), any(AcompanhamentoVirtual.class))).thenReturn(acompanhamentoAtualizado);

        mockMvc.perform(put("/api/acompanhamento/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));

        verify(acompanhamentoService).atualizar(eq(id), any(AcompanhamentoVirtual.class));
    }

    @Test
    public void deletarAcompanhamentoTest() throws Exception {
        Long id = 1L;

        doNothing().when(acompanhamentoService).deletar(id);

        mockMvc.perform(delete("/api/acompanhamento/{id}", id))
                .andExpect(status().isNoContent());

        verify(acompanhamentoService).deletar(id);
    }

    @Test
    public void taxaSatisfacaoTest() throws Exception {
        Double taxaSatisfacao = 90.0;

        when(acompanhamentoService.getTaxaSatisfacao()).thenReturn(taxaSatisfacao);

        mockMvc.perform(get("/api/acompanhamento/taxaSatisfacao"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(taxaSatisfacao)));

        verify(acompanhamentoService).getTaxaSatisfacao();
    }

    @Test
    public void indiceAcompanhamentoTest() throws Exception {
        List<AcompanhamentoInterface> indices = Arrays.asList(/* Instâncias de AcompanhamentoInterface */);

        when(acompanhamentoService.getIndiceAcompanhamento()).thenReturn(indices);

        mockMvc.perform(get("/api/acompanhamento/indiceAcompanhamento"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(indices.size())));

        verify(acompanhamentoService).getIndiceAcompanhamento();
    }

}



