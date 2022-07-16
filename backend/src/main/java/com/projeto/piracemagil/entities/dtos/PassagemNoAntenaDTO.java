package com.projeto.piracemagil.entities.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassagemNoAntenaDTO {
  
  private Long id;    
  private Date dataRegistro;
  private PeixeNoPassagensDTO peixe;

}
