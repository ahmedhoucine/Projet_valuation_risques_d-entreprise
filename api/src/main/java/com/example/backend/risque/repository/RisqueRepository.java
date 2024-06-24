package com.example.backend.risque.repository;

import com.example.backend.risque.model.Risque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RisqueRepository extends JpaRepository<Risque,Integer> {
    Risque findBynom(String nom);
}
