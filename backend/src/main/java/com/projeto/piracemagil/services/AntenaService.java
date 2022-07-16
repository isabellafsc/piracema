package com.projeto.piracemagil.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.piracemagil.entities.Antena;
import com.projeto.piracemagil.repositories.AntenaRepository;

@Service
@Transactional
public class AntenaService {
  private final AntenaRepository antenaRepository;

  public AntenaService(AntenaRepository antenaRepository) {
    this.antenaRepository = antenaRepository;
  }

  public Antena save(Antena antena) {
    return antenaRepository.save(antena);
  }

  public List<Antena> findAll() {
    return antenaRepository.findAll();
  }

  public Antena findById(Long id) {
    Optional<Antena> optAntena = antenaRepository.findById(id);
    if (optAntena.isEmpty()) {
      throw new NoSuchElementException();
    }
    return optAntena.get();
  }

  public void deleteById(Long id) {
    Antena antena = this.findById(id);
    antenaRepository.delete(antena);
  }
}
