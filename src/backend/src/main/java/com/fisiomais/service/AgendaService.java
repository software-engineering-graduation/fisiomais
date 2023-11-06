package com.fisiomais.service;

import com.fisiomais.model.Agenda;
import com.fisiomais.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class AgendaService {

    private final AgendaRepository agendaRepository;

    @Autowired
    public AgendaService(AgendaRepository agendaRepository) {
        this.agendaRepository = agendaRepository;
    }

    public List<Agenda> getAgendasByFisioterapeuta(Integer fisioterapeutaId) {
        return agendaRepository.findByFisioterapeuta_Id(fisioterapeutaId);
    }

    public List<Agenda> getAgendasByDiaAndFisioterapeuta(Byte dia, Integer fisioterapeutaId) {
        return agendaRepository.findByDiaAndFisioterapeuta_Id(dia, fisioterapeutaId);
    }

    public List<Agenda> getAgendasByDisponibilidadeAndFisioterapeuta(Boolean disponivel, Integer fisioterapeutaId) {
        return agendaRepository.findByDisponivelAndFisioterapeuta_Id(disponivel, fisioterapeutaId);
    }

    public List<Agenda> getAgendasByFisioterapeutaDiaEHorario(Integer fisioterapeutaId, Byte dia, Time horarioInicio, Time horarioFim) {
        return agendaRepository.findByFisioterapeuta_IdAndDiaAndHorarioInicioLessThanEqualAndHorarioFimGreaterThanEqual(fisioterapeutaId, dia, horarioInicio, horarioFim);
    }

    public List<Agenda> getAgendasDisponiveisByFisioterapeutaAndDia(Integer fisioterapeutaId, Byte dia, Boolean disponivel) {
        return agendaRepository.findByFisioterapeuta_IdAndDiaAndDisponivel(fisioterapeutaId, dia, disponivel);
    }

    @Transactional
    public Agenda saveAgenda(Agenda agenda) {
        validateAgenda(agenda);
        return agendaRepository.save(agenda);
    }

    public void deleteAgenda(Integer agendaId) {
        if (!agendaRepository.existsById(agendaId)) {
            throw new RuntimeException("Agenda não encontrada para o ID: " + agendaId);
        }
        agendaRepository.deleteById(agendaId);
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

    private void validateAgenda(Agenda agenda) {
        if (agenda.getFisioterapeuta() == null) {
            throw new RuntimeException("É necessário especificar um fisioterapeuta para a agenda.");
        }

        if (agenda.getHorarioInicio().after(agenda.getHorarioFim())) {
            throw new RuntimeException("O horário de início não pode ser posterior ao horário de término.");
        }
    }
}
