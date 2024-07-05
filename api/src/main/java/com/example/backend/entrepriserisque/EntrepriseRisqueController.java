package com.example.backend.entrepriserisque;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.entreprise.repository.EntrepriseRepository;
import com.example.backend.entrepriserisque.EntrepriseRisque;
import com.example.backend.entrepriserisque.EntrepriseRisqueDTO;
import com.example.backend.entrepriserisque.EntrepriseRisqueRepository;
import com.example.backend.entrepriserisque.EntrepriseRisqueRepository;
import com.example.backend.risque.model.Risque;
import com.example.backend.risque.repository.RisqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/entreprise-risque")
public class EntrepriseRisqueController {

    @Autowired
    private EntrepriseRisqueRepository entrepriseRisqueRepository;

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private RisqueRepository risqueRepository;


    @GetMapping
    public List<EntrepriseRisque> getAllEntrepriseRisques() {
        return entrepriseRisqueRepository.findAll();
    }
    @PostMapping
    public ResponseEntity<EntrepriseRisque> createEntrepriseRisque(@RequestBody EntrepriseRisqueDTO entrepriseRisqueDTO) {

        Entreprise entreprise = entrepriseRepository.findById(entrepriseRisqueDTO.getEntrepriseId()).orElse(null);
        Risque risque = risqueRepository.findById(entrepriseRisqueDTO.getRisqueId()).orElse(null);


        if (entreprise == null || risque == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Create new EntrepriseRisque instance
        EntrepriseRisque entrepriseRisque = new EntrepriseRisque(entreprise, risque, entrepriseRisqueDTO.getPercentage());

        // Save the new EntrepriseRisque instance
        entrepriseRisqueRepository.save(entrepriseRisque);

        return ResponseEntity.status(HttpStatus.CREATED).body(entrepriseRisque);
    }
    @GetMapping("/{entrepriseId}")
    public ResponseEntity<?> getEntrepriseRisquesByEntrepriseId(@PathVariable("entrepriseId") Integer entrepriseId) {
        List<EntrepriseRisque> entrepriseRisques = entrepriseRisqueRepository.findByEntrepriseId(entrepriseId);

        List<SimpleEntrepriseRisqueDTO> simplifiedRisques = entrepriseRisques.stream()
                .map(entrepriseRisque -> new SimpleEntrepriseRisqueDTO(entrepriseRisque.getRisque().getRisqueId(), entrepriseRisque.getPercentage()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(simplifiedRisques);
    }
    @GetMapping("/{entrepriseId}/risque")
    public ResponseEntity<?> getRisquesByEntrepriseId(@PathVariable("entrepriseId") Integer entrepriseId) {
        List<EntrepriseRisque> entrepriseRisques = entrepriseRisqueRepository.findByEntrepriseId(entrepriseId);

        return ResponseEntity.ok(entrepriseRisques);
    }

    @DeleteMapping("/{entrepriseId}")
    public ResponseEntity<Void> deleteAllRisquesForEntreprise(@PathVariable("entrepriseId") Integer entrepriseId) {
        List<EntrepriseRisque> entrepriseRisques = entrepriseRisqueRepository.findByEntrepriseId(entrepriseId);

        for (EntrepriseRisque risque : entrepriseRisques) {
            entrepriseRisqueRepository.deleteById(risque.getId());
        }

        return ResponseEntity.noContent().build();
    }
}
