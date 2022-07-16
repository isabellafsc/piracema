package com.projeto.piracemagil.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.piracemagil.entities.Antena;
import com.projeto.piracemagil.entities.dtos.AntenaDTO;
import com.projeto.piracemagil.services.AntenaService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/antenas")
@Slf4j
public class AntenaController {
  
  private AntenaService antenaService;
  private ModelMapper modelMapper;

  public AntenaController(AntenaService antenaService, ModelMapper modelMapper) {
    this.antenaService = antenaService;
    this.modelMapper = modelMapper;
  }

  //CREATE ANTENA
  @PostMapping
  public ResponseEntity<AntenaDTO> create(@RequestBody Antena antena){
    try {
      Antena saveAntena = antenaService.save(antena); 
      return ResponseEntity.ok(modelMapper.map(saveAntena,AntenaDTO.class));
    } catch (Exception e) {
      log.error("Falha na inserção de uma antena",e);       
      return ResponseEntity.notFound().build();
    }
  }

  //GET ALL
  @GetMapping
  public ResponseEntity<List<AntenaDTO>> findAll() {
    List<Antena> antenas = antenaService.findAll();
    List<AntenaDTO> antenaDTOs = antenas.stream().map(r -> modelMapper.map(r, AntenaDTO.class)).collect(Collectors.toList());
    return ResponseEntity.ok(antenaDTOs);
  }

  //GET BY ID
  @GetMapping("/{id}")
  public ResponseEntity<AntenaDTO> getById(@PathVariable Long id) {
    try {
      Antena antena = antenaService.findById(id);
      return ResponseEntity.ok(modelMapper.map(antena,AntenaDTO.class));
    } catch(Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  //UPDATE ANTENA
  @PutMapping("/{id}")
  public ResponseEntity<AntenaDTO> update(@PathVariable Long id, @RequestBody Antena antena) {
    try {
      Antena foundAntena = antenaService.findById(id);
      modelMapper.map(antena, foundAntena);
      antenaService.save(foundAntena);
      return ResponseEntity.ok(modelMapper.map(foundAntena,AntenaDTO.class));
    } catch(Exception e) {
      log.error("Falha durante atualização", e);
      return ResponseEntity.notFound().build();
    }
  }

  //DELETE ANTENA
  @DeleteMapping("/{id}")
  public ResponseEntity<?> remove(@PathVariable Long id) {
    try {
      antenaService.deleteById(id); 
      return ResponseEntity.ok().build();
    } catch(Exception e) {
      log.error("Falha durante remoção", e);
      return ResponseEntity.notFound().build();
    }
  }
}
