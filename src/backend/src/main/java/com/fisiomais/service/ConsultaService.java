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

    public Consulta updateConsultaStatus(Integer consultaId, StatusConsulta status) {
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

    public void deleteConsulta(Integer consultaId) {
        consultaRepository.deleteById(consultaId);
    }

    public Consulta getConsultaById(Integer consultaId) {
        return consultaRepository.findById(consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada para o ID: " + consultaId));
    }

    public List<Consulta> getConsultasByStatus(StatusConsulta status) {
        return consultaRepository.findByConfirmacao(status);
    }

    public List<Consulta> getConsultasByPacienteId(Long pacienteId) {
        return consultaRepository.findByPaciente_Id(pacienteId);
    }

    public Consulta marcarConsultaComoConcluida(Integer consultaId) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setConfirmacao(StatusConsulta.Realizado);
        return consultaRepository.save(consulta);
    }

    public Consulta cancelarConsulta(Integer consultaId) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setConfirmacao(StatusConsulta.Cancelado);
        return consultaRepository.save(consulta);
    }

    public Consulta reagendarConsulta(Integer consultaId, Date novaDataHora) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setDataEHora(novaDataHora);
        return consultaRepository.save(consulta);
    }

    public void notificarPaciente(Integer consultaId, String mensagem) {
    }

    public Consulta confirmarPresenca(Integer consultaId) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setConfirmacao(StatusConsulta.Confirmado);
        return consultaRepository.save(consulta);
    }

    public Consulta registrarFeedback(Integer consultaId, String feedback) {
        Consulta consulta = getConsultaById(consultaId);
        consulta.setObservacoes(feedback);
        return consultaRepository.save(consulta);
    }

    public List<Consulta> getAllConsultas() {
        return consultaRepository.findAll();
    }
}
