package com.example.backend.controller;

import com.example.backend.model.Risque;
import com.example.backend.repository.RisqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/risques")
public class RisqueController {

    @Autowired
    RisqueRepository risqueRepository;

    @GetMapping
    public List<Risque> getAllRisques() {
        return risqueRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Risque> getRisque(@PathVariable("id") Integer id) {
        Optional<Risque> risque = risqueRepository.findById(id);
        return risque.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Risque> createRisque(@RequestBody Risque risque) {
        Risque savedRisque = risqueRepository.save(risque);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRisque);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Risque> updateRisque(@PathVariable("id") Integer id, @RequestBody Risque risqueDetails) {
        Optional<Risque> optionalRisque = risqueRepository.findById(id);

        if (optionalRisque.isPresent()) {
            Risque existingRisque = optionalRisque.get();
            existingRisque.setNom(risqueDetails.getNom());
            existingRisque.setDescription(risqueDetails.getDescription());
            existingRisque.setCoefficient(risqueDetails.getCoefficient());
            existingRisque.setPrecaution(risqueDetails.getPrecaution());

            Risque updatedRisque = risqueRepository.save(existingRisque);
            return ResponseEntity.ok(updatedRisque);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRisque(@PathVariable("id") Integer id) {
        if (risqueRepository.existsById(id)) {
            risqueRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
