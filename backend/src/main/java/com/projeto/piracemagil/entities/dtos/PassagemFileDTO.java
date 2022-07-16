package com.projeto.piracemagil.entities.dtos;

import java.time.LocalDateTime;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassagemFileDTO {

    @CsvBindByName(column = "idAntena")
    private Long idAntena;
    @CsvBindByName(column = "pittag")
    private String pittag;
    @CsvBindByName(column = "dataRegistro")
    @CsvDate(value = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataRegistro;

}
