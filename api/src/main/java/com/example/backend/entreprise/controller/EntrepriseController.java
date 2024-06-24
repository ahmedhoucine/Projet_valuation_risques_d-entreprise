package com.example.backend.entreprise.controller;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.entreprise.repository.EntrepriseRepository;
import com.example.backend.entrepriserisque.EntrepriseRisque;
import com.example.backend.entrepriserisque.EntrepriseRisqueDTO;
import com.example.backend.risque.model.Risque;
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRisque(@PathVariable("id") Integer id) {
        if (entrepriseRepository.existsById(id)) {
            entrepriseRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Entreprise> searchEntrepriseByNomLegal(@RequestParam String nom_legal) {
        Entreprise entreprise = entrepriseRepository.findBynom_legal(nom_legal);
        if (entreprise != null) {
            return ResponseEntity.ok(entreprise);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/pourcentagerisque")
    public ResponseEntity<Entreprise> updatePourcentageRisque(@PathVariable("id") Integer id, @RequestParam("pourcentagerisque") float pourcentagerisque) {
        Optional<Entreprise> entrepriseOpt = entrepriseRepository.findById(id);
        if (entrepriseOpt.isPresent()) {
            Entreprise entreprise = entrepriseOpt.get();
            entreprise.setPourcentagerisque(pourcentagerisque);
            entrepriseRepository.save(entreprise);
            return ResponseEntity.ok(entreprise);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
