package com.fisiomais.service;

import org.springframework.stereotype.Service;

import com.fisiomais.dto.MidiaDTO;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Midia;
import com.fisiomais.model.enums.TipoArquivo;
import com.fisiomais.repository.MidiaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MidiaService {

    private final MidiaRepository midiaRepository;

    public MidiaService(MidiaRepository midiaRepository) {
        this.midiaRepository = midiaRepository;
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
        Midia midia = midiaRepository.findById(id).orElse(null);
        if (midia != null) {
            // Convert the Paciente entity to a PacienteDTO, if necessary
            // For simplicity, we assume the DTO structure is identical to the entity
            return toDTO(midia);
        }
        return null; // Return null if the Paciente is not found
    }

    public MidiaDTO createMidia(MidiaDTO midiaDTO) {
        // Convert PacienteDTO to Paciente entity, if necessary
        // For simplicity, we assume the DTO structure is identical to the entity
        Midia midia = toEntity(midiaDTO);

        // Save the Paciente entity to the database
        Midia savedMidia = midiaRepository.save(midia);

        // Convert the saved Paciente entity back to PacienteDTO
        return toDTO(savedMidia);
    }

    public boolean deleteMidia(Integer id) {
        if (midiaRepository.existsById(id)) {
            midiaRepository.deleteById(id);
            return true; // Return true if the Paciente is deleted
        }
        return false; // Return false if the Paciente is not found
    }

    public boolean deleteMidia(List<Integer> ids) {
        boolean deleted = false;
        for (Integer id : ids) {
            deleted = deleteMidia(id);
        }
        return deleted;
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
        midiaDTO.setArquivo(midia.getArquivo());
        midiaDTO.setLinkArquivo(midia.getLinkArquivo());
        midiaDTO.setTitulo(midia.getTitulo());
        midiaDTO.setDescricao(midia.getDescricao());
        return midiaDTO;
    }

    private Midia toEntity(MidiaDTO midiaDTO) {
        Midia midia = new Midia();
        midia.setId(midiaDTO.getId());
        midia.setFisioterapeuta(new Fisioterapeuta()); // TODO - add link to fisioterapeuta repository, seraching by id
        midia.setCreateTime(midiaDTO.getCreateTime());
        midia.setType(midiaDTO.getType());
        midia.setArquivo(midiaDTO.getArquivo());
        midia.setLinkArquivo(midiaDTO.getLinkArquivo());
        midia.setTitulo(midiaDTO.getTitulo());
        midia.setDescricao(midiaDTO.getDescricao());
        return midia;
    }

    private List<MidiaDTO> convertMidiasToDTOs(List<Midia> midias) {
        return midias.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
