package com.example.backend.risque.model;

import jakarta.persistence.*;

@Entity
@Table(name = "risque")
public class Risque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "risque_id")
    private Integer risqueId;

    @Column(name = "nom")
    private String nom;

    @Column(name = "description")
    private String description;

    @Column(name = "coefficient")
    private int coefficient;

    @Column(name = "precaution")
    private String precaution;

    public Risque() {
    }

    public Risque(Integer id, String nom, String description, int coefficient, String precaution) {
        this.risqueId = id;
        this.nom = nom;
        this.description = description;
        this.coefficient = coefficient;
        this.precaution = precaution;
    }

    public Integer getRisqueId() {
        return risqueId;
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
