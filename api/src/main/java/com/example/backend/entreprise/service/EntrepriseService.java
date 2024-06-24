package com.example.backend.entreprise.service;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.entreprise.repository.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntrepriseService {
    @Autowired
    private EntrepriseRepository entrepriseRepository;
    public Entreprise findBynom_legal (String nom_legal) {
        return entrepriseRepository.findBynom_legal(nom_legal);
}
}
