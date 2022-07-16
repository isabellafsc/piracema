package com.projeto.piracemagil.entities.dtos;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AntenaDTO {

  private Long id;
  private String nome;
  private String latitude;
  private String longitude;
  private Date dataInstalacao;
  private Date dataDesativacao;
  private List<PassagemNoAntenaDTO> passagens;
  private List<StatusAntenaNoAntenaDTO> statusAntenas;
  
}
