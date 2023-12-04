import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.fisiomais.controller.FisioterapeutaController;
import com.fisiomais.dto.FisioterapeutaDTO;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.service.FisioterapeutaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class FisioterapeutaTest {

    @InjectMocks
    private FisioterapeutaController fisioterapeutaController;

    @Mock
    private FisioterapeutaService fisioterapeutaService;

    @Test
    void getAllFisioterapeutas_ShouldReturnFisioterapeutasList() {
        List<Fisioterapeuta> fisioterapeutasMock = List.of(new Fisioterapeuta(/* ... */));
        when(fisioterapeutaService.findAll()).thenReturn(fisioterapeutasMock);

        ResponseEntity<List<Fisioterapeuta>> response = fisioterapeutaController.getAllFisioterapeutas();

        assertEquals(fisioterapeutasMock, response.getBody());
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void getFisioterapeutaById_ShouldReturnFisioterapeuta() {
        Integer fisioterapeutaId = 1;
        Fisioterapeuta fisioterapeutaMock = new Fisioterapeuta(/* ... */);
        when(fisioterapeutaService.findById(fisioterapeutaId)).thenReturn(Optional.of(fisioterapeutaMock));

        ResponseEntity<Optional<Fisioterapeuta>> response = fisioterapeutaController.getFisioterapeutaById(fisioterapeutaId);

        assertTrue(response.getBody().isPresent());
        assertEquals(fisioterapeutaMock, response.getBody().get());
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void createFisioterapeuta_ShouldCreateAndReturnFisioterapeuta() {
        FisioterapeutaDTO fisioterapeutaDTO = new FisioterapeutaDTO(/* ... */);
        Fisioterapeuta fisioterapeutaMock = new Fisioterapeuta(/* ... */);
        when(fisioterapeutaService.create(fisioterapeutaDTO)).thenReturn(fisioterapeutaMock);

        ResponseEntity<Fisioterapeuta> response = fisioterapeutaController.createFisioterapeuta(fisioterapeutaDTO);

        assertEquals(fisioterapeutaMock, response.getBody());
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void updateFisioterapeuta_ShouldUpdateAndReturnFisioterapeuta() {
        Integer fisioterapeutaId = 1;
        FisioterapeutaDTO fisioterapeutaDTO = new FisioterapeutaDTO(/* ... */);
        Fisioterapeuta fisioterapeutaAtualizadoMock = new Fisioterapeuta(/* ... */);
        when(fisioterapeutaService.update(fisioterapeutaId, fisioterapeutaDTO)).thenReturn(fisioterapeutaAtualizadoMock);

        ResponseEntity<Fisioterapeuta> response = fisioterapeutaController.updateFisioterapeuta(fisioterapeutaId, fisioterapeutaDTO);

        assertEquals(fisioterapeutaAtualizadoMock, response.getBody());
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void deleteFisioterapeuta_ShouldDeleteFisioterapeuta() {
        Integer fisioterapeutaId = 1;
        doNothing().when(fisioterapeutaService).deleteById(fisioterapeutaId);

        ResponseEntity<Void> response = fisioterapeutaController.deleteFisioterapeuta(fisioterapeutaId);

        assertEquals(200, response.getStatusCodeValue());
        verify(fisioterapeutaService).deleteById(fisioterapeutaId);
    }
}
