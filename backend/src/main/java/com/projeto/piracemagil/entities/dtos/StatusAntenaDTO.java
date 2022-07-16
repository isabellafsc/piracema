package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusAntenaDTO {
 
  private Boolean status;
  private LocalDateTime dataMudancaStatus;
  private AntenaNoStatusDTO antena;
  
}
