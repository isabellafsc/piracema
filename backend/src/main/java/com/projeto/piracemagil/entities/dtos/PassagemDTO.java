package com.projeto.piracemagil.entities.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassagemDTO {
  
  private Long id;    
  private LocalDateTime dataRegistro;
  private PeixeNoPassagensDTO peixe;
  private AntenaNoPassagensDTO antena;

}
