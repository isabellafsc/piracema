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

import com.projeto.piracemagil.entities.StatusAntena;
import com.projeto.piracemagil.entities.dtos.StatusAntenaDTO;
import com.projeto.piracemagil.entities.dtos.StatusAntenaFormDTO;
import com.projeto.piracemagil.services.StatusAntenaService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/statusantenas")
@Slf4j
public class StatusAntenaController {
  private StatusAntenaService statusAntenaService;
  private ModelMapper modelMapper;

  public StatusAntenaController( StatusAntenaService statusAntenaService, ModelMapper modelMapper) {
    this.statusAntenaService = statusAntenaService;
    this.modelMapper = modelMapper;
  }

  //CREATE STATUS ANTENA
  @PostMapping
  public ResponseEntity<StatusAntenaDTO> create(@RequestBody StatusAntenaFormDTO statusAntena) {
    try {
      StatusAntena savedStatusAntena = statusAntenaService.create(statusAntena);
      StatusAntenaDTO StatusAntenaDTO = modelMapper.map(savedStatusAntena, StatusAntenaDTO.class);
      return ResponseEntity.ok(StatusAntenaDTO);
    } catch(Exception e) {
      log.error("erro",e);  
      return ResponseEntity.status(400).build();
    }
  }

  //GET ALL
  @GetMapping
  public ResponseEntity<List<StatusAntenaDTO>> findAll() {
    List<StatusAntena> statusAntenas = statusAntenaService.findAll();
    List<StatusAntenaDTO> statusAntenaDTOs = statusAntenas.stream()
                                                          .map(r -> modelMapper.map(r, StatusAntenaDTO.class))
                                                          .collect(Collectors.toList());
    return ResponseEntity.ok(statusAntenaDTOs);
  }

  //GET STATUSANTENA
  @GetMapping("/{id}")
  public ResponseEntity<StatusAntenaDTO> getById(@PathVariable Long id) {
    try {
      StatusAntena statusAntena = statusAntenaService.findById(id);
      return ResponseEntity.ok(modelMapper.map(statusAntena,StatusAntenaDTO.class));
    } catch(Exception e) {
      log.error("StatusAntena não encontradro", e);
      return ResponseEntity.notFound().build();
    }
  }

  //UPDATE STATUSANTENA
  @PutMapping("/{id}")
  public ResponseEntity<StatusAntenaDTO> update(@PathVariable Long id, @RequestBody StatusAntena antena) {
    try {
      StatusAntena foundAntena = statusAntenaService.findById(id);
      modelMapper.map(antena, foundAntena);
      statusAntenaService.save(foundAntena);
      return ResponseEntity.ok(modelMapper.map(foundAntena,StatusAntenaDTO.class));
    } catch(Exception e) {
      log.error("Falha durante atualização", e);
      return ResponseEntity.notFound().build();
    }
  } 

  //DELETE STATUSANTENA
  @DeleteMapping("/{id}")
  public ResponseEntity<?> remove(@PathVariable Long id) {
    try {
      statusAntenaService.deleteById(id); 
      return ResponseEntity.ok().build();
    } catch(Exception e) {
      log.error("Falha durante remoção", e);
      return ResponseEntity.notFound().build();
    }
  }
}
