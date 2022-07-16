package com.projeto.piracemagil.entities.dtos;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusAntenaFormDTO {

  private Boolean status;
  private LocalDateTime dataMudancaStatus;
  private Long idAntena;

}
