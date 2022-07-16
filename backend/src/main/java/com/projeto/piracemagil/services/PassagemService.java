package com.projeto.piracemagil.services;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.projeto.piracemagil.entities.Antena;
import com.projeto.piracemagil.entities.Passagem;
import com.projeto.piracemagil.entities.Peixe;
import com.projeto.piracemagil.entities.dtos.PassagemFileDTO;
import com.projeto.piracemagil.entities.dtos.PassagemFormDTO;
import com.projeto.piracemagil.repositories.PassagemRepository;

@Service
@Transactional
public class PassagemService {
  private PassagemRepository passagemRepository;
  private AntenaService antenaService;
  private PeixeService peixeService;
  private ParseCSVService parseCSVService;

  public PassagemService(PassagemRepository passagemRepository, AntenaService antenaService, PeixeService peixeService,
      ParseCSVService parseCSVService) {
    this.passagemRepository = passagemRepository;
    this.antenaService = antenaService;
    this.peixeService = peixeService;
    this.parseCSVService = parseCSVService;
  }
  
  public Passagem create(PassagemFormDTO passagemDTO) {
    Peixe foundPeixe = peixeService.findById(passagemDTO.getIdPeixe()); 
    Antena foundAntena = antenaService.findById(passagemDTO.getIdAntena()); 

    Passagem passagem = new Passagem();
    passagem.setDataRegistro(passagemDTO.getDataRegistro());
    
    foundPeixe.getPassagens().add(passagem);
    passagem.setPeixe(foundPeixe);

    foundAntena.getPassagens().add(passagem);
    passagem.setAntena(foundAntena);

    return passagemRepository.save(passagem);
  }

  public Passagem create(PassagemFileDTO passagemDTO) {
    Peixe foundPeixe = peixeService.findByPittag(passagemDTO.getPittag());
    Antena foundAntena = antenaService.findById(Long.valueOf(passagemDTO.getIdAntena())); 

    Passagem passagem = new Passagem();
    passagem.setDataRegistro(passagemDTO.getDataRegistro());
    
    foundPeixe.getPassagens().add(passagem);
    passagem.setPeixe(foundPeixe);

    foundAntena.getPassagens().add(passagem);
    passagem.setAntena(foundAntena);

    return passagemRepository.save(passagem);
  }

  public List<Passagem> upload(MultipartFile file) throws IOException {
    List<PassagemFileDTO> passagensDTO = parseCSVService.parse(file);
    return passagensDTO.stream().map(c -> create(c)).collect(Collectors.toList()); 
  }

  public List<Passagem> findAll() {
      return passagemRepository.findAll();
  }
  public Passagem findById(Long id) {
    Optional<Passagem> optPassagem = passagemRepository.findById(id);
    if (optPassagem.isEmpty()) {
        throw new NoSuchElementException();
    }
    return optPassagem.get();
  }
  
    public void deleteById(Long id) {
      Passagem passagem = findById(id);
      passagemRepository.delete(passagem);
  }
}
