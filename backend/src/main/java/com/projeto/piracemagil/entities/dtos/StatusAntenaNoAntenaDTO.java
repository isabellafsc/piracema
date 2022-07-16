package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusAntenaNoAntenaDTO {
   
  private Long id;
  private Boolean status;
  private LocalDateTime dataMudancaStatus;

}
