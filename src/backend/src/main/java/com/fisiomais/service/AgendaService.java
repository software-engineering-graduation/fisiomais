package com.fisiomais.service;

import com.fisiomais.bodys.AgendaResponse;
import com.fisiomais.bodys.FisioterapeutaResponse;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.Agenda;
import com.fisiomais.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
public class AgendaService {
    private final AgendaRepository agendaRepository;
    private final TokenService tokenService;

    public AgendaService(AgendaRepository agendaRepository, TokenService tokenService) {
        this.agendaRepository = agendaRepository;
        this.tokenService = tokenService;
    }

    public List<AgendaResponse> getAgendasByFisioterapeuta(Integer fisioterapeutaId) {
        List<Agenda> allAgendas = agendaRepository.findByFisioterapeuta_Id(fisioterapeutaId);
        List<AgendaResponse> agendasResponse = new ArrayList<>();
        for (Agenda agenda : allAgendas) {
            agendasResponse.add(toAgendaResponse(agenda));
        }
        return agendasResponse;
    }

    public List<Agenda> getAgendasByDiaAndFisioterapeuta(Byte dia, Integer fisioterapeutaId) {
        return agendaRepository.findByDiaAndFisioterapeuta_Id(dia, fisioterapeutaId);
    }

    public List<Agenda> getAgendasByDisponibilidadeAndFisioterapeuta(Boolean disponivel, Integer fisioterapeutaId) {
        return agendaRepository.findByDisponivelAndFisioterapeuta_Id(disponivel, fisioterapeutaId);
    }

    public List<Agenda> getAgendasByFisioterapeutaDiaEHorario(Integer fisioterapeutaId, Byte dia, Time horarioInicio,
            Time horarioFim) {
        return agendaRepository.findByFisioterapeuta_IdAndDiaAndHorarioInicioLessThanEqualAndHorarioFimGreaterThanEqual(
                fisioterapeutaId, dia, horarioInicio, horarioFim);
    }

    public List<Agenda> getAgendasDisponiveisByFisioterapeutaAndDia(Integer fisioterapeutaId, Byte dia,
            Boolean disponivel) {
        return agendaRepository.findByFisioterapeuta_IdAndDiaAndDisponivel(fisioterapeutaId, dia, disponivel);
    }

    @Transactional
    public Agenda saveAgenda(Agenda agenda) {
        validateAgenda(agenda);
        try {
            return agendaRepository.save(agenda);
        } catch (Exception e) {
            System.out.println("Erro ao salvar agenda: " + e.getMessage());
            throw new BusinessException("Erro ao salvar agenda: " + e.getMessage());
        }
    }

    public void deleteAgenda(List<Integer> ids, String token) {
        List<Agenda> existingAgendas = new ArrayList<>();
        try {
            existingAgendas.addAll(agendaRepository.findAllById(ids));
            System.out.println("Agendas: " + existingAgendas);
        } catch (Exception e) {
            throw new BusinessException("Não foi possível encontrar as agendas [" + ids + "]");
        }

        if (existingAgendas.isEmpty()) {
            throw new BusinessException("Não foi possível encontrar as agendas [" + ids + "]");
        }

        for (Agenda agenda : existingAgendas) {
            String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));

            if (!agenda.getFisioterapeuta()
                    .getEmail()
                    .equals(loggedUserEmail) &&
                    !this.tokenService.isAdmin(loggedUserEmail)) {
                throw new BusinessException("Não é possível deletar uma agenda que não pertence ao usuário logado.");
            }

            try {
                agendaRepository.delete(agenda);
            } catch (Exception e) {
                throw new BusinessException(
                        "Erro ao excluir agenda de id [" + agenda.getId() + "]: " + e.getMessage());
            }
        }
    }

    @Transactional
    public Agenda updateAgenda(Agenda agenda) {
        if (agenda.getId() == null || !agendaRepository.existsById(agenda.getId())) {
            throw new RuntimeException("Não é possível atualizar uma agenda que não existe.");
        }
        validateAgenda(agenda);
        return agendaRepository.save(agenda);
    }

    public Agenda getAgendaById(Integer agendaId) {
        return agendaRepository.findById(agendaId)
                .orElseThrow(() -> new RuntimeException("Agenda não encontrada para o ID: " + agendaId));
    }

    public void validateAgenda(Agenda agenda) {
        if (agenda.getHorarioInicio().after(agenda.getHorarioFim())) {
            throw new BusinessException("O horário de início não pode ser posterior ao horário de término.");
        }
    }

    // Mappers
    private AgendaResponse toAgendaResponse(Agenda agenda) {
        FisioterapeutaResponse fisio = FisioterapeutaResponse.toFisioterapeutaResponse(agenda.getFisioterapeuta());
        AgendaResponse nova = new AgendaResponse(
                agenda.getId(),
                agenda.getDisponivel(),
                agenda.getDia(),
                agenda.getHorarioInicio(),
                agenda.getHorarioFim(),
                fisio);

        return nova;
    }
}
