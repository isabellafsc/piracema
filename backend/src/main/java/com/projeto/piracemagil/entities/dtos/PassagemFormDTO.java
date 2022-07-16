package com.projeto.piracemagil.entities.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassagemFormDTO {

  private Long idAntena;
  private Long idPeixe;
  private LocalDateTime dataRegistro;
  
}
