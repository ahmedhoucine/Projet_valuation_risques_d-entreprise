package com.example.backend.entrepriserisque;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EntrepriseRisqueRepository extends JpaRepository<EntrepriseRisque, Integer> {
    List<EntrepriseRisque> findByEntrepriseId(Integer entrepriseId);


}
