package com.projeto.piracemagil.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.piracemagil.entities.Peixe;

@Repository
public interface PeixeRepository extends JpaRepository<Peixe, Long> {

    Optional<Peixe> findTopByPittagOrderByIdDesc(String pittag);

    List<Peixe> findByPittagOrderById(String pittag);
    List<Peixe> findByNomeCientificoOrderById(String nomeCientifico);
    List<Peixe> findByLocalCapturaOrderById(String localCaptura);
    List<Peixe> findByDataSolturaOrderById(LocalDateTime dataSoltura);
    List<Peixe> findByLocalSolturaOrderById(String localSoltura);
    List<Peixe> findByAmostraDnaOrderById(String amostraDna);
    List<Peixe> findByRecapturaOrderById(Boolean recaptura);

    Optional<Peixe> findTopByAmostraDnaOrderByIdDesc(String amostraDna);

    List<Peixe> findAllByPittag(String pittag);
   
}
