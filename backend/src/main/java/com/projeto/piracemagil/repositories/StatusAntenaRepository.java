package com.projeto.piracemagil.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.piracemagil.entities.StatusAntena;

@Repository
public interface StatusAntenaRepository extends JpaRepository<StatusAntena, Long> {

}
