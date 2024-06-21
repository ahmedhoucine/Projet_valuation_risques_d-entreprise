package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "risque")
public class Risque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String description;
    private int coefficient;
    private String precaution;

    public Risque() {
    }

    public Risque(String nom, String description, int coefficient, String précaution) {
        this.nom = nom;
        this.description = description;
        this.coefficient = coefficient;
        this.precaution = précaution;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(int coefficient) {
        this.coefficient = coefficient;
    }

    public String getPrecaution() {
        return precaution;
    }

    public void setPrecaution(String precaution) {
        this.precaution = precaution;
    }
}
