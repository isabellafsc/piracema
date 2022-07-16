package com.projeto.piracemagil.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.piracemagil.entities.Peixe;
import com.projeto.piracemagil.entities.dtos.PeixeAlteraDTO;
import com.projeto.piracemagil.entities.dtos.PeixeBlocoDTO;
import com.projeto.piracemagil.entities.dtos.PeixeDTO;
import com.projeto.piracemagil.entities.dtos.PeixeNoPassagensDTO;
import com.projeto.piracemagil.entities.dtos.PeixeTelaDTO;
import com.projeto.piracemagil.services.PeixeService;
import com.projeto.piracemagil.services.excecao.DataBaseException;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/peixes")
@Slf4j
public class PeixeController {
  private PeixeService peixeService;
  private ModelMapper modelMapper;

  private Boolean update = false;
 
  public PeixeController(PeixeService peixeService, ModelMapper modelMapper) {
    this.peixeService = peixeService;
    this.modelMapper = modelMapper;
  }

  //CREATE PEIXE
  @PostMapping
  public ResponseEntity<PeixeNoPassagensDTO> create(@RequestBody Peixe peixe) {
    try {
      Peixe savedPeixe = peixeService.save(peixe, update);
      PeixeNoPassagensDTO peixeDTO = modelMapper.map(savedPeixe, PeixeNoPassagensDTO.class);
      return ResponseEntity.ok(peixeDTO);
    } catch(Exception e) {
      log.error("Falha durante inserção", e);
      return ResponseEntity.notFound().build();
    }
  }

  // //CREATE BLOCO PEIXES
  // @PostMapping("/multiple")
  // public ResponseEntity<List<PeixeNoPassagensDTO>> create(@RequestBody List<Peixe> peixes) {
  //   try {
  //     List<PeixeNoPassagensDTO> peixeNoPassagensDTOs = peixes.stream().map(p -> modelMapper.map(peixeService.save(p, update), PeixeNoPassagensDTO.class)).collect(Collectors.toList());
  //     return ResponseEntity.ok(peixeNoPassagensDTOs);
  //   } catch (Exception e) {
  //     log.error("Falha durante inserção", e);
  //     return ResponseEntity.notFound().build();
  //   }
  // }

  //CREATE BLOCO PEIXES
  @PostMapping("/bloco")
  public ResponseEntity<?> createBlock(@RequestBody PeixeBlocoDTO peixeBlocoDTO) {
    try {
      List<Peixe> listPeixe = new ArrayList<>();
      for (int i = 0; i < peixeBlocoDTO.getUnico().size(); i++) {
        Peixe peixe = new Peixe();
        modelMapper.map(peixeBlocoDTO.getRepetivel().get(0), peixe);
        modelMapper.map(peixeBlocoDTO.getUnico().get(i), peixe);
        listPeixe.add(peixe);
      }
      for (int i = 0; i < listPeixe.size(); i++) {
        peixeService.save(listPeixe.get(i), update);
      }
      return ResponseEntity.status(HttpStatus.OK).body(listPeixe);
    } catch (Exception e) {
      log.error("Falha durante inserção", e);
      return ResponseEntity.notFound().build();
    }
  }

  //ALTERAR NOME E COMPRIMENTO DE TODOS PEIXES COM MESMA PITTAG
  @PostMapping("/alterar")
    public ResponseEntity<?> update(@RequestParam(value = "recaptura", required = false) Boolean recaptura,
                                    @RequestParam(value = "pittag", required = false) String pittag,
                                    @RequestBody PeixeAlteraDTO peixeAlteraDTO) {
      try {
        List<Peixe> peixes = new ArrayList<>();
        Peixe peixeVelho = peixeService.findByPittag(pittag);
        Peixe peixeNovo = new Peixe();
        peixes = peixeService.findAllByPittag(peixeVelho.getPittag());
        modelMapper.map(peixeVelho, peixeNovo);
        peixeNovo.setId(null);
        modelMapper.map(peixeAlteraDTO, peixeNovo);

        for (int i = 0; i < peixes.size(); i++) {
          peixes.get(i).setNomeCientifico(peixeNovo.getNomeCientifico());
          peixes.get(i).setNomePopular(peixeNovo.getNomePopular());
          peixes.get(i).setComprimentoPadrao(peixeNovo.getComprimentoPadrao());
        }

        if (recaptura = true) {
          peixeNovo.setRecaptura(true);
        }

        peixeService.update(peixeVelho);
        peixeService.update(peixeNovo);

        return ResponseEntity.ok(modelMapper.map(peixeNovo, PeixeDTO.class));

      } catch (Exception e) {
        throw new DataBaseException(e.getMessage());
      }
    }

  //GET
  @GetMapping
  public ResponseEntity<List<PeixeTelaDTO>> findAll(@RequestParam(value = "pittag", required = false) String pittag, 
                                                    @RequestParam(value = "nomeCientifico", required = false) String nomeCientifico, 
                                                    @RequestParam(value = "localCaptura", required = false) String localCaptura,
                                                    @RequestParam(value = "dataSoltura", required = false)@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataSoltura,
                                                    @RequestParam(value = "localSoltura", required = false) String localSoltura,
                                                    @RequestParam(value = "amostraDna", required = false) String amostraDna, 
                                                    @RequestParam(value = "recaptura", required = false) Boolean recaptura) {
    List<Peixe> peixes; 
    if (pittag != null) {
      peixes = peixeService.findByPittagOrderById(pittag);
    } else if (nomeCientifico != null) {
      peixes = peixeService.findByNomeCientificoOrderById(nomeCientifico);
    } else if (localCaptura != null) {
      peixes = peixeService.findByLocalCapturaOrderById(localCaptura);
    } else if (dataSoltura != null) {
      peixes = peixeService.findByDataSolturaOrderById(dataSoltura);
    } else if (localSoltura != null) {
      peixes = peixeService.findByLocalSolturaOrderById(localSoltura);
    } else if (amostraDna != null) {
      peixes = peixeService.findByAmostraDnaOrderById(amostraDna);
    } else if (recaptura != null) {
      peixes = peixeService.findByRecapturaOrderById(recaptura);
    } else {
      peixes = peixeService.findAll();           
    }
    List<PeixeTelaDTO> peixeDTOs = peixes.stream().map(r -> modelMapper.map(r, PeixeTelaDTO.class)).collect(Collectors.toList());
    return ResponseEntity.ok(peixeDTOs);
  }

  //GET BY ID
  @GetMapping("/{id}")
  public ResponseEntity<PeixeDTO> getById(@PathVariable Long id) {
    try {
      Peixe peixe = peixeService.findById(id);
      return ResponseEntity.ok(modelMapper.map(peixe,PeixeDTO.class));
    } catch(Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  //UPDATE PEIXE
  @PutMapping("/{id}")
  public ResponseEntity<PeixeDTO> update(@PathVariable Long id, @RequestBody Peixe peixe) {
    try {
      Peixe foundPeixe = peixeService.findById(id);
      modelMapper.map(peixe, foundPeixe);
      peixeService.save(foundPeixe, update);
      return ResponseEntity.ok(modelMapper.map(foundPeixe,PeixeDTO.class));
    } catch(Exception e) {
      log.error("Falha durante atualização", e);
      return ResponseEntity.notFound().build();
    }
  }

  //DELETE PEIXE
  @DeleteMapping("/{id}")
  public ResponseEntity<?> remove(@PathVariable Long id) {
    try {
      peixeService.deleteById(id); 
      return ResponseEntity.ok().build();
    } catch(Exception e) {
      log.error("Falha durante remoção", e);
      return ResponseEntity.notFound().build();
    }
  }
}

