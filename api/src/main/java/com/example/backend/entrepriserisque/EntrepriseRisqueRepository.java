package com.example.backend.entrepriserisque;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EntrepriseRisqueRepository extends JpaRepository<EntrepriseRisque, Integer> {
    List<EntrepriseRisque> findByEntrepriseId(Integer entrepriseId);
}
