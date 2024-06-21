package com.example.backend.entreprise.repository;

import com.example.backend.entreprise.model.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepriseRepository extends JpaRepository<Entreprise,Integer> {
}
