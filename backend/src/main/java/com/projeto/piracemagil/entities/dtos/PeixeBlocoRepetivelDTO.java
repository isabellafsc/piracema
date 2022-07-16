package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PeixeBlocoRepetivelDTO {
  
  private String nomeCientifico;
  private String nomePopular;
  private Integer comprimentoPadrao;
  private String localCaptura;
  private LocalDateTime dataSoltura;
  private String localSoltura;

}
