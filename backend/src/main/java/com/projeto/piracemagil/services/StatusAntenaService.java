package com.projeto.piracemagil.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.piracemagil.entities.Antena;
import com.projeto.piracemagil.entities.StatusAntena;
import com.projeto.piracemagil.entities.dtos.StatusAntenaFormDTO;
import com.projeto.piracemagil.repositories.StatusAntenaRepository;

@Service
@Transactional
public class StatusAntenaService {
    private StatusAntenaRepository statusAntenaRepository;
    private AntenaService antenaService;
    
    public StatusAntenaService(StatusAntenaRepository statusAntenaRepository, AntenaService antenaService) {
        this.statusAntenaRepository = statusAntenaRepository;
        this.antenaService = antenaService;
    }

    public StatusAntena create(StatusAntenaFormDTO statusAntenaDTO) {
        Antena foundAntena = antenaService.findById(Long.valueOf(statusAntenaDTO.getIdAntena()));  

        StatusAntena statusAntena = new StatusAntena();
        statusAntena.setStatus(statusAntenaDTO.getStatus());
        statusAntena.setDataMudancaStatus(statusAntenaDTO.getDataMudancaStatus());
            
        foundAntena.getStatusAntenas().add(statusAntena);
        statusAntena.setAntena(foundAntena);

        return statusAntenaRepository.save(statusAntena);
    }


    public StatusAntena save(StatusAntena statusAntena) {
       return statusAntenaRepository.save(statusAntena);
    }

     public List<StatusAntena> findAll() {
        return statusAntenaRepository.findAll();
    }

     public StatusAntena findById(Long id) {
        Optional<StatusAntena> optStatusAntena = statusAntenaRepository.findById(id);
        if (optStatusAntena.isEmpty()) {
            throw new NoSuchElementException();
        }
        return optStatusAntena.get();
    }

    public void deleteById(Long id) {
        StatusAntena statusAntena = this.findById(id);
        statusAntenaRepository.delete(statusAntena);
    }
}
