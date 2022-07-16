package com.projeto.piracemagil.services;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.projeto.piracemagil.entities.dtos.PassagemFileDTO;


@Service
public class ParseCSVService {
  public List<PassagemFileDTO> parse(MultipartFile file) throws IOException {
    Reader reader = new InputStreamReader(file.getInputStream());

    CsvToBean<PassagemFileDTO> csvToBean = new CsvToBeanBuilder(reader).withSeparator(';').withType(PassagemFileDTO.class).build();

    List<PassagemFileDTO> dtos = csvToBean.parse();

    return dtos;
  }
}
