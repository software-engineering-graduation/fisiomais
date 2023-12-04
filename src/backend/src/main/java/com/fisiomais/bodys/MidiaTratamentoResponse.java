package com.fisiomais.bodys;

import java.util.List;

import com.fisiomais.model.Midia;
import com.fisiomais.model.enums.TipoArquivo;

public record MidiaTratamentoResponse(
        Integer id,
        String titulo,
        String descricao,
        String linkArquivo,
        TipoArquivo type,
        Integer fisioterapeutaId,
        Boolean isPublic) {

    static public List<MidiaTratamentoResponse> toResponse(List<Midia> midias) {
        return midias.stream()
                .map(midia -> MidiaTratamentoResponse.toResponse(midia))
                .toList();
    }

    static public MidiaTratamentoResponse toResponse(Midia midia) {
        return new MidiaTratamentoResponse(
                midia.getId(),
                midia.getTitulo(),
                midia.getDescricao(),
                midia.getLinkArquivo(),
                midia.getType(),
                midia.getFisioterapeuta().getId(),
                midia.getIsPublic());
    }
}
