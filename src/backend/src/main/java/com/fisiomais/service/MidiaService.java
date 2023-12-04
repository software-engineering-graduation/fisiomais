package com.fisiomais.service;

import org.springframework.stereotype.Service;

import com.fisiomais.bodys.MidiaTratamentoResponse;
import com.fisiomais.dto.MidiaDTO;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.exception.NotFoundException;
import com.fisiomais.model.Exercicio;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Midia;
import com.fisiomais.model.enums.TipoArquivo;
import com.fisiomais.model.indicators.MidiaTypesMetrics;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.repository.MidiaRepository;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MidiaService {

    private final MidiaRepository midiaRepository;
    private final FisioterapeutaRepository fisioterapeutaRepository;
    private final ExercicioService exercicioService;
    private final TokenService tokenService;

    public MidiaService(MidiaRepository midiaRepository, FisioterapeutaRepository fisioterapeutaRepository,
            ExercicioService exercicioService, TokenService tokenService) {
        this.midiaRepository = midiaRepository;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
        this.exercicioService = exercicioService;
        this.tokenService = tokenService;
    }

    public List<Midia> getMidiaByFisioterapeuta(Fisioterapeuta fisioterapeuta) {
        return midiaRepository.findMidiaByFisioterapeuta(fisioterapeuta);
    }

    public List<MidiaDTO> getAllMidias() {
        // Convert Paciente entities to PacienteDTOs, if necessary
        // This is where you can implement the conversion logic
        // For simplicity, we assume PacienteDTO is identical to Paciente

        List<Midia> midias = midiaRepository.findAll();
        // You may use a mapping library (e.g., ModelMapper) to convert entities to DTOs
        // For simplicity, we assume the DTO structure is identical to the entity
        return convertMidiasToDTOs(midias);
    }

    public MidiaDTO getMidiaById(int id) {
        Midia midia = midiaRepository.findById(id).orElseThrow(NotFoundException::new);
        return toDTO(midia);
    }

    public MidiaDTO createMidia(MidiaDTO midiaDTO) {
        Midia midia = toEntity(midiaDTO);

        if (midia.getLinkArquivo() == null) {
            throw new BusinessException("Link do arquivo não pode ser nulo");
        }

        Midia savedMidia = midiaRepository.save(midia);
        return toDTO(savedMidia);
    }

    public boolean deleteMidia(Integer id) {
        Optional<Midia> existingMidia = midiaRepository.findById(id);

        if (existingMidia.isPresent()) {
            Midia midia = existingMidia.get();

            // Fetch related exercises through the ExerciseService or ExerciseRepository
            List<Exercicio> exercisesRelatedToMidia = exercicioService.findExerciciosByMidia(midia);

            if (!exercisesRelatedToMidia.isEmpty()) {
                System.out.println("Mídia is present on: " + exercisesRelatedToMidia.size() + " exercises");
                for (Exercicio exercicio : exercisesRelatedToMidia) {
                    exercicioService.deleteMidia(exercicio, midia);
                }
            }

            midiaRepository.deleteById(id);
            return true; // Return true if the 'Midia' is successfully deleted
        }

        return false; // Return false if the Paciente is not found
    }

    public void deleteMidia(List<Integer> ids, String token) {
        List<Midia> existingMidias = new ArrayList<>();
        try {
            existingMidias.addAll(midiaRepository.findAllById(ids));
        } catch (Exception e) {
            throw new NotFoundException("Erro ao buscar midias [" + ids + "]");
        }

        if (existingMidias.isEmpty()) {
            throw new NotFoundException("Nenhuma mídia encontrada");
        }

        for (Midia midia : existingMidias) {
            String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));

            if (!midia.getFisioterapeuta()
                    .getEmail()
                    .equals(loggedUserEmail)) {
                throw new NotFoundException("Você não pode excluir uma mídia de outro fisioterapeuta");
            }
            try {
                midiaRepository.delete(midia);
            } catch (Exception e) {
                throw new BusinessException(
                        "Erro ao excluir mídia de id [" + midia.getId() + "]: " + e.getMessage());
            }
        }
    }

    // Additional methods for custom business logic, validation, etc.
    // You can define these methods based on your project's requirements

    // Helper methods for converting between Paciente and PacienteDTO
    private MidiaDTO toDTO(Midia midia) {
        MidiaDTO midiaDTO = new MidiaDTO();
        midiaDTO.setId(midia.getId());
        midiaDTO.setCreateTime(midia.getCreateTime());
        midiaDTO.setFisioterapeutaId(midia.getFisioterapeuta().getId());
        TipoArquivo type = midia.getType();
        if (type == null) {
            throw new NullPointerException("Type from Midia: null");
        }
        midiaDTO.setType(midia.getType());

        // Decode Titulo and Descricao from UTF-8
        String titulo = null;
        String descricao = null;

        try {
            titulo = new String(midia.getTitulo().getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
            descricao = new String(midia.getDescricao().getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error decoding string. Please provide a valid string format.");
        }

        midiaDTO.setTitulo(titulo);
        midiaDTO.setDescricao(descricao);
        midiaDTO.setLinkArquivo(midia.getLinkArquivo());
        return midiaDTO;
    }

    private Midia toEntity(MidiaDTO midiaDTO) {
        Midia midia = new Midia();
        midia.setId(midiaDTO.getId());
        Fisioterapeuta owner = fisioterapeutaRepository.findById(midiaDTO.getFisioterapeutaId()).orElse(null);
        if (owner == null) {
            throw new NullPointerException("Fisioterapeuta from Midia: null");
        }
        midia.setFisioterapeuta(owner);
        midia.setCreateTime(midiaDTO.getCreateTime());
        midia.setType(midiaDTO.getType());
        midia.setLinkArquivo(midiaDTO.getLinkArquivo());
        midia.setIsPublic(midiaDTO.getIsPublic());

        // Encode Titulo and Descricao to ISO-8859-1
        String titulo = null;
        String descricao = null;

        try {
            titulo = new String(midiaDTO.getTitulo().getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
            descricao = new String(midiaDTO.getDescricao().getBytes(StandardCharsets.UTF_8),
                    StandardCharsets.ISO_8859_1);
        } catch (Exception e) {
            throw new RuntimeException("Error encoding string. Please provide a valid string format.");
        }

        midia.setTitulo(titulo);
        midia.setDescricao(descricao);
        return midia;
    }

    private List<MidiaDTO> convertMidiasToDTOs(List<Midia> midias) {
        return midias.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MidiaTypesMetrics> getTaxaUtilizacao() {
        return midiaRepository.getTaxaUtilizacao();
    }

    public List<Midia> getAvailableMidias(String token, Fisioterapeuta fisioterapeuta) {
        if (this.tokenService.isAdmin(token)) {
            return midiaRepository
                    .findAll();
        }

        List<Midia> midiasFisioterapeut = this.getMidiaByFisioterapeuta(fisioterapeuta);
        List<Midia> midiasPublicas = midiaRepository.findAllByIsPublicTrue();
        List<Midia> groupedMidias = new ArrayList<>();
        groupedMidias.addAll(midiasFisioterapeut);
        groupedMidias.addAll(midiasPublicas);

        return groupedMidias
                .stream()
                .distinct()
                .sorted((m1, m2) -> m1.getId().compareTo(m2.getId()))
                .toList();
    }

    public List<Midia> getPublicMidias() {
        return midiaRepository.findAllByIsPublicTrue();
    }
}
