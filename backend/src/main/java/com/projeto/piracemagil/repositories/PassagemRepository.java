package com.projeto.piracemagil.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.piracemagil.entities.Passagem;

@Repository
public interface PassagemRepository extends JpaRepository<Passagem, Long> {
  
}
