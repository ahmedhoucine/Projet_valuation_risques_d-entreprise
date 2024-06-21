package com.example.backend.risque.repository;

import com.example.backend.risque.model.Risque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RisqueRepository extends JpaRepository<Risque,Integer> {
}
