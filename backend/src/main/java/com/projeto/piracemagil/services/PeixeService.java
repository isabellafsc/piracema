package com.projeto.piracemagil.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.piracemagil.entities.Peixe;
import com.projeto.piracemagil.repositories.PeixeRepository;

@Service
@Transactional
public class PeixeService {
  private final PeixeRepository peixeRepository;

  public PeixeService(PeixeRepository peixeRepository) {
    this.peixeRepository = peixeRepository;
  }

  public Peixe save(Peixe peixe, Boolean update){

    Optional<Peixe> optionalPeixe = peixeRepository.findTopByPittagOrderByIdDesc(peixe.getPittag());

    Optional<Peixe> optionalPeixeDna = peixeRepository.findTopByAmostraDnaOrderByIdDesc(peixe.getAmostraDna());

    if(optionalPeixe.isPresent()) {
      Peixe foundedPeixe = optionalPeixe.get();

      if(!update){
        if(foundedPeixe.getPittag().equals(peixe.getPittag()) && !peixe.getRecaptura()){
          throw new DataIntegrityViolationException("Peixe ja existe e nao foi informado que é uma recaptura");
        }
      }
    }

    if(optionalPeixeDna.isPresent()) {
      Peixe foundedPeixe = optionalPeixeDna.get();

      if(!update){
        if(foundedPeixe.getAmostraDna().equals(peixe.getAmostraDna()) && !peixe.getRecaptura()){
          throw new DataIntegrityViolationException("Peixe ja existe e nao foi informado que é uma recaptura");
        }
      }
    }
    return peixeRepository.save(peixe);
  }

  public List<Peixe> findAll() {
    return peixeRepository.findAll();
  }

  public Peixe findById(Long id) {
    Optional<Peixe> optPeixe = peixeRepository.findById(id);
    if (optPeixe.isEmpty()) {
      throw new NoSuchElementException();
    }
    return optPeixe.get();
  }

  public Peixe findByPittag(String pittag) {
    Optional<Peixe> optPeixe = peixeRepository.findTopByPittagOrderByIdDesc(pittag);
    if (optPeixe.isEmpty()) {
        throw new NoSuchElementException();
    }
    return optPeixe.get();
  }

  public List<Peixe> findByPittagOrderById(String pittag) {
    List<Peixe> optPeixe = peixeRepository.findByPittagOrderById(pittag);
    return optPeixe;
  }
  public List<Peixe> findByNomeCientificoOrderById(String nomeCientifico) {
    List<Peixe> optPeixe = peixeRepository.findByNomeCientificoOrderById(nomeCientifico);
    return optPeixe;
  }
  public List<Peixe> findByLocalCapturaOrderById(String localCaptura) {
    List<Peixe> optPeixe = peixeRepository.findByLocalCapturaOrderById(localCaptura);
    return optPeixe;
  }
  public List<Peixe> findByDataSolturaOrderById(LocalDateTime dataSoltura) {
    List<Peixe> optPeixe = peixeRepository.findByDataSolturaOrderById(dataSoltura);
    return optPeixe;
  }
  public List<Peixe> findByLocalSolturaOrderById(String localSoltura) {
    List<Peixe> optPeixe = peixeRepository.findByLocalSolturaOrderById(localSoltura);
    return optPeixe;
  }
  public List<Peixe> findByAmostraDnaOrderById(String amostraDna) {
    List<Peixe> optPeixe = peixeRepository.findByAmostraDnaOrderById(amostraDna);
    return optPeixe;
  }
  public List<Peixe> findByRecapturaOrderById(Boolean recaptura) {
    List<Peixe> optPeixe = peixeRepository.findByRecapturaOrderById(recaptura);
    return optPeixe;
  }

  public void deleteById(Long id) {
    Peixe peixe = findById(id);
    peixeRepository.delete(peixe);
  }

  public List<Peixe> findAllByPittag(String pittag) {
    return peixeRepository.findAllByPittag(pittag);
  }

  public Peixe update(Peixe peixe) {
    return peixeRepository.save(peixe);
  }
}
