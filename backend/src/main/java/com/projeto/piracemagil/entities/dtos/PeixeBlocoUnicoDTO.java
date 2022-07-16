package com.projeto.piracemagil.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PeixeBlocoUnicoDTO {

  private String pittag;
  private Integer comprimentoTotal;
  private Float pesoSoltura;
  private String amostraDna;
  private Boolean recaptura;
  private String comentario;  
  
}
