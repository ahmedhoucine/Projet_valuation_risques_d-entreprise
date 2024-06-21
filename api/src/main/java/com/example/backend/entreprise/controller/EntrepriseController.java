package com.example.backend.entreprise.controller;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.entreprise.repository.EntrepriseRepository;
import com.example.backend.entrepriserisque.EntrepriseRisque;
import com.example.backend.entrepriserisque.EntrepriseRisqueDTO;
import com.example.backend.risque.repository.RisqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entreprise")
public class EntrepriseController {
    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private RisqueRepository risqueRepository;


    @GetMapping
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entreprise> getEntreprise(@PathVariable("id") Integer id) {
        Optional<Entreprise> entreprise = entrepriseRepository.findById(id);
        return entreprise.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Entreprise> createEntreprise(@RequestBody Entreprise entreprise) {
        entrepriseRepository.save(entreprise);
        return ResponseEntity.status(HttpStatus.CREATED).body(entreprise);
    }




}
