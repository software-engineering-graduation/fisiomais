import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.fisiomais.bodys.ConsultaResponseAgenda;
import com.fisiomais.bodys.FisioterapeutaResponse;
import com.fisiomais.bodys.NovaConsultaRequest;
import com.fisiomais.bodys.PacienteResponse;
import com.fisiomais.controller.ConsultaController;
import com.fisiomais.bodys.ConsultaResponse;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.Consulta;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Paciente;
import com.fisiomais.model.enums.StatusConsulta;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.ConsultaService;
import com.fisiomais.util.ConsultaUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RunWith(MockitoJUnitRunner.class)
public class ConsultaControllerTest {

    @Mock
    private ConsultaService consultaService;

    @Mock
    private ConsultaUtil consultaUtil;

    @Mock
    private FisioterapeutaRepository fisioterapeutaRepository;

    @InjectMocks
    private ConsultaController consultaController;

    private Consulta consulta;
    private ConsultaResponseAgenda consultaResponseAgenda;
    private ConsultaResponse consultaResponse;

    @Before
    public void setup() {
        consulta = new Consulta();
        consulta.set_id(1);
        consultaResponseAgenda = new ConsultaResponseAgenda(null,
                new PacienteResponse(null, null, null, null, null, null, null),
                new FisioterapeutaResponse(null, null, null, null, null, null),
                null,
                null,
                null,
                null);
        consultaResponse = new ConsultaResponse(1, 1, null, null, null, null);
    }

    @Test
    public void testGetAllConsultas() {
        when(consultaService.getAllConsultas()).thenReturn(Collections.singletonList(consulta));

        ResponseEntity<List<ConsultaResponseAgenda>> response = consultaController.getAllConsultas();

        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(consultaService, times(1)).getAllConsultas();
    }

    @Test
    public void testGetConsultasForDateRange() {
        when(consultaService.getConsultasForDate(any(), any())).thenReturn(Collections.singletonList(consulta));

        ResponseEntity<List<Consulta>> response = consultaController.getConsultasForDateRange("01-01-2023",
                "31-01-2023");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Collections.singletonList(consulta), response.getBody());
    }

    // Add more tests for other controller methods...

    @Test
    public void testGetConsultasForDateRangeInvalidDates() {
        assertThrows(BusinessException.class, () -> {
            consultaController.getConsultasForDateRange("invalidStartDate", "invalidEndDate");
        });
    }

    @Test
    public void testAddConsulta() {
        when(consultaUtil.convertToConsulta(any())).thenReturn(consulta);
        when(consultaService.addConsulta(any())).thenReturn(consultaResponse);

        ResponseEntity<ConsultaResponse> response = consultaController
                .addConsulta(new NovaConsultaRequest(null, null, null, null));

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(consultaResponse, response.getBody());
    }

    @Test(expected = BusinessException.class)
    public void testAddConsultaInvalidData() {
        when(consultaUtil.convertToConsulta(any())).thenThrow(new BusinessException("Invalid data"));

        consultaController.addConsulta(new NovaConsultaRequest(null, null, null, null));
    }

    @Test
    public void testDeleteConsulta() {
        ResponseEntity<?> response = consultaController.deleteConsulta(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(consultaService, times(1)).deleteConsulta(1);
    }

    @Test
    public void testGetTaxaConclusao() {
        when(consultaService.getTaxaConclusao()).thenReturn(75.0);

        ResponseEntity<Double> response = consultaController.getTaxaConclusao();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(75.0, response.getBody(), 0.01);
    }
}
