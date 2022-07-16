package com.projeto.piracemagil.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StatusAntena {
  @Id   
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private LocalDateTime dataRegistro;

  @ManyToOne
  @JoinColumn(name = "id_antena")
  private Antena antena;

  @Column(nullable = false)
  private Boolean status;

  private LocalDateTime dataMudancaStatus;

  @PrePersist
  public void create() {
    dataRegistro = LocalDateTime.now();
  }
}
