package com.fisiomais.service;

import com.fisiomais.model.Consulta;
import com.fisiomais.model.enums.StatusConsulta;
import com.fisiomais.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;

    @Autowired
    public ConsultaService(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    public List<Consulta> getConsultasForDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);
        return consultaRepository.findByDataEHoraBetween(startOfDay, endOfDay);
    }

    public Consulta updateConsultaStatus(Long consultaId, StatusConsulta status) {
        Optional<Consulta> consultaOptional = consultaRepository.findById(consultaId);
        if (consultaOptional.isPresent()) {
            Consulta consulta = consultaOptional.get();
            consulta.setConfirmacao(status);
            return consultaRepository.save(consulta);
        } else {
            throw new RuntimeException("Consulta não encontrada para o ID: " + consultaId);
        }
    }

    public Consulta addConsulta(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    public void deleteConsulta(Long consultaId) {
        consultaRepository.deleteById(consultaId);
    }

    public Consulta getConsultaById(Long consultaId) {
        return consultaRepository.findById(consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada para o ID: " + consultaId));
    }

    public List<Consulta> getConsultasByStatus(StatusConsulta status) {
        return consultaRepository.findByConfirmacao(status);
    }

    public List<Consulta> getConsultasByPacienteId(Long pacienteId) {
        return consultaRepository.findByPaciente_Id(pacienteId);
    }

    public Consulta marcarConsultaComoConcluida(Long consultaId) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setConfirmacao(StatusConsulta.Realizado);
        return consultaRepository.save(consulta);
    }

    public Consulta cancelarConsulta(Long consultaId) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setConfirmacao(StatusConsulta.Cancelado);
        return consultaRepository.save(consulta);
    }

    public Consulta reagendarConsulta(Long consultaId, Date novaDataHora) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setData_e_hora(novaDataHora);
        return consultaRepository.save(consulta);
    }

    public void notificarPaciente(Long consultaId, String mensagem) {
    }

    public Consulta confirmarPresenca(Long consultaId) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setConfirmacao(StatusConsulta.Confirmado);
        return consultaRepository.save(consulta);
    }

    public Consulta registrarFeedback(Long consultaId, String feedback) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setObservacoes(feedback);
        return consultaRepository.save(consulta);
    }
}
