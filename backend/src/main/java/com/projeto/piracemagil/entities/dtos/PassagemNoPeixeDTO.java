package com.projeto.piracemagil.entities.dtos;
 
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassagemNoPeixeDTO {

  private Long id;    
  private Date dataRegistro;
  private AntenaNoPassagensDTO antena;
  
}
