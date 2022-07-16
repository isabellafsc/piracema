package com.projeto.piracemagil.entities.dtos;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PeixeBlocoDTO {
  
  private List<PeixeBlocoRepetivelDTO> repetivel;
  private List<PeixeBlocoUnicoDTO> unico;

}
