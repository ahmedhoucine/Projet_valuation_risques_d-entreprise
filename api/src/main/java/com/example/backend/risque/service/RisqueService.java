package com.example.backend.risque.service;

import com.example.backend.risque.model.Risque;
import com.example.backend.risque.repository.RisqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RisqueService {
    @Autowired
    private RisqueRepository risqueRepository;

    public Risque findByName(String name) {
        return risqueRepository.findBynom(name);
    }
}