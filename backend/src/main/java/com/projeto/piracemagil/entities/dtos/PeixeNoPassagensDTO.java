package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeixeNoPassagensDTO {

  private Long id;
  private String pittag;
  private String nomeCientifico;
  private String nomePopular;
  private Integer comprimentoPadrao;
  private Integer comprimentoTotal;
  private String localCaptura;
  private Float pesoSoltura;
  private LocalDateTime dataSoltura;
  private String localSoltura;
  private String amostraDna;
  private Boolean recaptura = false;
  private String comentario;  
  
}
