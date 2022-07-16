package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeixeAlteraDTO {

  private String nomeCientifico;
  private String nomePopular;
  private Integer comprimentoPadrao;
  private Integer comprimentoTotal;
  private String localCaptura;
  private Float pesoSoltura;
  private LocalDateTime dataSoltura;
  private String localSoltura;
  private String amostraDna;
  private Boolean recaptura;
  private String comentario;  
  private List<PassagemNoPeixeDTO> passagens;

}
