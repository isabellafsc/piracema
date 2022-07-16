package com.projeto.piracemagil.entities;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "peixe")
public class Peixe {
  @Id   
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDateTime dataRegistro;

  private LocalDateTime dataEdicao;

  @Column(nullable = false)
  private String pittag;
  
  @Column(nullable = false)
  private String nomeCientifico;

  private String nomePopular;

  @Column(nullable = false)
  private Integer comprimentoPadrao;

  @Column(nullable = false)
  private Integer comprimentoTotal;

  @Column(nullable = false)
  private String localCaptura;

  @Column(nullable = false)
  private Float pesoSoltura;

  @Column(nullable = false)
  private LocalDateTime dataSoltura;

  @Column(nullable = false)
  private String localSoltura;

  @Column(nullable = false)
  private String amostraDna;

  private Boolean recaptura = false;

  private String comentario;  

  @OneToMany(mappedBy = "peixe")
  private List<Passagem> passagens;

  @PrePersist
  public void create() {
    dataRegistro = LocalDateTime.now();
    dataEdicao = LocalDateTime.now();
  }

  @PreUpdate
  public void update() {
    dataEdicao = LocalDateTime.now();
  }
}
