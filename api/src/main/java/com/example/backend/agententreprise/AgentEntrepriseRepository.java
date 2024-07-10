package com.example.backend.agententreprise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentEntrepriseRepository extends JpaRepository<AgentEntreprise, Long> {

    List<AgentEntreprise> findByEntrepriseId(Long entrepriseId);
}