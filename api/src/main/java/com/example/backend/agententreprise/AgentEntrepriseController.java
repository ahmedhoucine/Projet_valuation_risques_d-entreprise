package com.example.backend.agententreprise;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.entreprise.repository.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agent-entreprise")
public class AgentEntrepriseController {

    @Autowired
    private AgentEntrepriseRepository agentEntrepriseRepository;

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    // Create a new AgentEntreprise
    @PostMapping
    public ResponseEntity<AgentEntreprise> createAgentEntreprise(@RequestBody AgentEntrepriseRequest request) {
        Optional<Entreprise> entrepriseOptional = entrepriseRepository.findById(request.getEntrepriseId());
        if (!entrepriseOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Entreprise entreprise = entrepriseOptional.get();
        AgentEntreprise agentEntreprise = new AgentEntreprise();
        agentEntreprise.setEntreprise(entreprise);

        // Set the filePath from AgentEntrepriseRequest to AgentEntreprise
        agentEntreprise.setFilePath(request.getFilePath());

        AgentEntreprise savedAgentEntreprise = agentEntrepriseRepository.save(agentEntreprise);
        return ResponseEntity.ok(savedAgentEntreprise);
    }


    // Get all AgentEntreprises
    @GetMapping
    public List<AgentEntreprise> getAllAgentEntreprises() {
        return agentEntrepriseRepository.findAll();
    }
    // Get all AgentEntreprises by Entreprise ID
    @GetMapping("/by-entreprise/{entrepriseId}")
    public ResponseEntity<List<AgentEntreprise>> getAllAgentEntreprisesByEntrepriseId(@PathVariable Long entrepriseId) {
        List<AgentEntreprise> agentEntreprises = agentEntrepriseRepository.findByEntrepriseId(entrepriseId);
        if (agentEntreprises.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(agentEntreprises);
    }
    // Get a single AgentEntreprise by ID
    @GetMapping("/{id}")
    public ResponseEntity<AgentEntreprise> getAgentEntrepriseById(@PathVariable(value = "id") Long id) {
        Optional<AgentEntreprise> agentEntreprise = agentEntrepriseRepository.findById(id);
        return agentEntreprise.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    // Update an existing AgentEntreprise
    @PutMapping("/{id}")
    public ResponseEntity<AgentEntreprise> updateAgentEntreprise(@PathVariable(value = "id") Long id, @RequestBody AgentEntreprise agentEntrepriseDetails) {
        Optional<AgentEntreprise> agentEntreprise = agentEntrepriseRepository.findById(id);
        if (agentEntreprise.isPresent()) {
            AgentEntreprise agentEntrepriseToUpdate = agentEntreprise.get();
            agentEntrepriseToUpdate.setEntreprise(agentEntrepriseDetails.getEntreprise());
            // agentEntrepriseToUpdate.setFilePath(agentEntrepriseDetails.getFilePath());
            final AgentEntreprise updatedAgentEntreprise = agentEntrepriseRepository.save(agentEntrepriseToUpdate);
            return ResponseEntity.ok(updatedAgentEntreprise);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an AgentEntreprise
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgentEntreprise(@PathVariable(value = "id") Long id) {
        Optional<AgentEntreprise> agentEntreprise = agentEntrepriseRepository.findById(id);
        if (agentEntreprise.isPresent()) {
            agentEntrepriseRepository.delete(agentEntreprise.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
