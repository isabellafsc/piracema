package com.projeto.piracemagil.entities;

import java.time.LocalDateTime;
import java.util.Date;
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
@Table(name = "antenas")
public class Antena {
  @Id   
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private LocalDateTime dataRegistro;

  private LocalDateTime dataEdicao;

  private String nome;

  @Column(nullable = false)
  private String latitude;

  @Column(nullable = false)
  private String longitude;

  @Column(nullable = false)
  private Date dataInstalacao;

  private Date dataDesativacao;

  @OneToMany(mappedBy = "antena")
  private List<Passagem> passagens;

  @OneToMany(mappedBy = "antena")
  private List<StatusAntena> statusAntenas;

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
