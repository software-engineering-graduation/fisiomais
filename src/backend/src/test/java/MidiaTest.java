import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.fisiomais.controller.MidiaController;
import com.fisiomais.dto.MidiaDTO;
import com.fisiomais.model.enums.TipoArquivo;
import com.fisiomais.model.indicators.MidiaTypesMetrics;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.MidiaService;
import com.fisiomais.service.TokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class MidiaTest {

    @InjectMocks
    private MidiaController midiaController;

    @Mock
    private MidiaService midiaService;

    @Mock
    private FisioterapeutaRepository fisioterapeutaRepository;

    @Mock
    private TokenService tokenService;

    @Test
    void getAllMidias_ShouldReturnAllMidias() {
        List<MidiaDTO> midiaListMock = List.of(new MidiaDTO());
        when(midiaService.getAllMidias()).thenReturn(midiaListMock);

        ResponseEntity<List<MidiaDTO>> response = midiaController.getAllMidias();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(midiaListMock, response.getBody());
    }

    @Test
    void getMidiaById_ShouldReturnMidia() {
        Integer midiaId = 1;
        MidiaDTO midiaMock = new MidiaDTO();
        when(midiaService.getMidiaById(midiaId)).thenReturn(midiaMock);

        ResponseEntity<MidiaDTO> response = midiaController.getMidiaById(midiaId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(midiaMock, response.getBody());
    }


    @Test
    void createMidia_ShouldReturnNewMidia() {
        MidiaDTO midiaDTO = new MidiaDTO(
                null,
                1,
                new Date(),
                TipoArquivo.Imagem,
                "http://linkvalido.com/arquivo.jpg",
                "Titulo da Midia",
                "Descrição da mídia",
                true
        );

        MidiaDTO createdMidiaMock = new MidiaDTO(
                1,
                midiaDTO.getFisioterapeutaId(),
                midiaDTO.getCreateTime(),
                midiaDTO.getType(),
                midiaDTO.getLinkArquivo(),
                midiaDTO.getTitulo(),
                midiaDTO.getDescricao(),
                midiaDTO.getIsPublic()
        );

        when(midiaService.createMidia(any(MidiaDTO.class))).thenReturn(createdMidiaMock);

        ResponseEntity<MidiaDTO> response = midiaController.createMidia(midiaDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdMidiaMock, response.getBody());
    }

    @Test
    void deleteMidia_ShouldDeleteMidias() {
        List<Integer> ids = List.of(1, 2, 3);
        String token = "Bearer token";
        doNothing().when(midiaService).deleteMidia(ids, token);

        ResponseEntity<Void> response = midiaController.deleteMidia(ids, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(midiaService).deleteMidia(ids, token);
    }

    @Test
    void getTaxaUtilizacao_ShouldReturnMetrics() {
        MidiaTypesMetrics metricsMock = new MidiaTypesMetrics();
        when(midiaService.getTaxaUtilizacao()).thenReturn(List.of(metricsMock));

        ResponseEntity<MidiaTypesMetrics> response = midiaController.getTaxaUtilizacao();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(metricsMock, response.getBody());
    }

}
