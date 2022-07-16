package com.projeto.piracemagil.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.projeto.piracemagil.entities.Passagem;
import com.projeto.piracemagil.entities.dtos.PassagemDTO;
import com.projeto.piracemagil.entities.dtos.PassagemFormDTO;
import com.projeto.piracemagil.services.PassagemService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/passagens")
@Slf4j
public class PassagemController {
  private PassagemService passagemService;
  private ModelMapper modelMapper;

  public PassagemController(PassagemService passagemService, ModelMapper modelMapper) {
    this.passagemService = passagemService;
    this.modelMapper = modelMapper;
  }

  //CREATE PASSAGEM
  @PostMapping
  public ResponseEntity<PassagemDTO> create(@RequestBody PassagemFormDTO passagem) {
    try {
      Passagem savedPass = passagemService.create(passagem);
      PassagemDTO passagemDTO = modelMapper.map(savedPass, PassagemDTO.class);
      return ResponseEntity.ok(passagemDTO);
    } catch(Exception e) {
      return ResponseEntity.status(400).build();
    }
  }

  //UPLOAD PASSAGENS CSV
  @PostMapping("/upload")
  public ResponseEntity<List<PassagemDTO>> createFromCSV(@RequestParam("csvFile") MultipartFile file) {
    try {
      List<Passagem> passagens = passagemService.upload(file);
      List<PassagemDTO> passagensDTO = passagens.stream().map(p -> modelMapper.map(p,PassagemDTO.class)).collect(Collectors.toList());
      return ResponseEntity.ok(passagensDTO);
    } catch(Exception e) {
      return ResponseEntity.status(400).build();
    }
  }

  //GET ALL
  @GetMapping
  public ResponseEntity<List<PassagemDTO>> getAll(){
    List<Passagem> passagens = passagemService.findAll();
    List<PassagemDTO> passagensDtos = passagens.stream().map(p -> modelMapper.map(p, PassagemDTO.class)).collect(Collectors.toList());
    return ResponseEntity.ok(passagensDtos);
  }

  //GET PASSAGEM
  @GetMapping("/{id}")
  public ResponseEntity<PassagemDTO> getById(@PathVariable Long id) {
    try {
      Passagem passagem = passagemService.findById(id);
      return ResponseEntity.ok(modelMapper.map(passagem,PassagemDTO.class));
    } catch(Exception e) {
      log.error("Passagem não encontradra", e);
      return ResponseEntity.notFound().build();
    }
  }
  
  //DELETE PASSAGEM
  @DeleteMapping("/{id}")
  public ResponseEntity<?> remove(@PathVariable Long id) {
    try {
      passagemService.deleteById(id); 
      return ResponseEntity.ok().build();
    } catch(Exception e) {
      log.error("Falha durante remoção", e);
      return ResponseEntity.notFound().build();
    }
  }
}
