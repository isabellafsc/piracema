package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeixeTelaDTO { //DADOS DA TELA DE LISTAGEM - RNF08

  private Long id;
  private String pittag;
  private String nomeCientifico;
  private String nomePopular;
  private String localCaptura;
  private LocalDateTime dataSoltura;
  private String localSoltura;
  private String amostraDna;
  private Boolean recaptura;
  private String comentario;  

}
