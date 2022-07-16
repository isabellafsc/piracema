package com.projeto.piracemagil.entities.dtos;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AntenaStatusFormDTO {
   
  private Boolean status;
  private Date dataMudancaStatus;
  private Integer idAntena;
  
}


