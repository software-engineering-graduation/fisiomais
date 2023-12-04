import com.fisiomais.bodys.PacienteResponse;
import com.fisiomais.controller.PacienteController;
import com.fisiomais.dto.PacienteDTO;
import com.fisiomais.model.enums.Genero;
import com.fisiomais.service.PacienteService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PacienteTest {

    @InjectMocks
    private PacienteController pacienteController;

    @Mock
    private PacienteService pacienteService;

    @Test
    void getAllPacientes_ShouldReturnAllPacientes() {
        List<PacienteDTO> pacienteListMock = List.of(
                new PacienteDTO(1, new Date(), "Nome Paciente", "email@teste.com", "01/01/2000", "12345678901", "1111111111", Genero.Homem, "Endereço", "senha123")
        );
        when(pacienteService.getAllPacientes()).thenReturn(pacienteListMock);

        ResponseEntity<List<PacienteDTO>> response = pacienteController.getAllPacientes();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pacienteListMock, response.getBody());
    }

    @Test
    void getPacienteById_ShouldReturnPaciente() {
        PacienteDTO pacienteMock = new PacienteDTO(1, new Date(), "Nome Paciente", "email@teste.com", "01/01/2000", "12345678901", "1111111111", Genero.Homem, "Endereço", "senha123");
        when(pacienteService.getPacienteById(1)).thenReturn(pacienteMock);

        ResponseEntity<PacienteDTO> response = pacienteController.getPacienteById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pacienteMock, response.getBody());
    }

    @Test
    void createPaciente_ShouldReturnCreatedPaciente() {
        PacienteDTO pacienteDTO = new PacienteDTO(null, new Date(), "Nome Paciente", "email@teste.com", "01/01/2000", "12345678901", "1111111111", Genero.Homem, "Endereço", "senha123");
        PacienteResponse createdPacienteMock = new PacienteResponse(1, "Nome Paciente", "email@teste.com", "1111111111", "Endereço", new Date(), Genero.Homem);
        when(pacienteService.createPaciente(any(PacienteDTO.class))).thenReturn(createdPacienteMock);

        ResponseEntity<PacienteResponse> response = pacienteController.createPaciente(pacienteDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdPacienteMock, response.getBody());
    }

    @Test
    void updatePaciente_ShouldReturnUpdatedPaciente() {
        PacienteDTO pacienteDTO = new PacienteDTO(1, new Date(), "Nome Paciente", "email@teste.com", "01/01/2000", "12345678901", "1111111111", Genero.Homem, "Endereço", "senha123");
        when(pacienteService.updatePaciente(eq(1), any(PacienteDTO.class))).thenReturn(pacienteDTO);

        ResponseEntity<PacienteDTO> response = pacienteController.updatePaciente(1, pacienteDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(pacienteDTO, response.getBody());
    }

    @Test
    void deletePaciente_ShouldDeletePaciente() {
        when(pacienteService.deletePaciente(1)).thenReturn(true);

        ResponseEntity<Void> response = pacienteController.deletePaciente(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(pacienteService).deletePaciente(1);
    }
}
