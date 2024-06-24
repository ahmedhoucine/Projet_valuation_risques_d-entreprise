package com.example.backend.entreprise.repository;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.risque.model.Risque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EntrepriseRepository extends JpaRepository<Entreprise,Integer> {
    @Query("SELECT e FROM Entreprise e WHERE e.nom_legal = :nom_legal")
    Entreprise findBynom_legal(@Param("nom_legal") String nom_legal);
}
