package com.projeto.piracemagil.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.piracemagil.entities.Antena;

@Repository
public interface AntenaRepository extends JpaRepository<Antena, Long> {
  
}
