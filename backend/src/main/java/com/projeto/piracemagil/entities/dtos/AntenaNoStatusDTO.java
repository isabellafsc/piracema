package com.projeto.piracemagil.entities.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AntenaNoStatusDTO {

  private Long id;
  private String nome;
  private String latitude;
  private String longitude;
  private Date dataInstalacao;
  private Date dataDesativacao;

}
