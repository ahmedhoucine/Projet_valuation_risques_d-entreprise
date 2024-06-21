package com.example.backend.entreprise.model;

import com.example.backend.entrepriserisque.EntrepriseRisque;
import com.example.backend.risque.model.Risque;
import jakarta.persistence.*;
import java.util.Set;
import java.util.List;

@Entity
@Table(name = "entreprise")
public class Entreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entreprise_id")
    private Integer entrepriseId;
    private String nom;
    private String nom_legal;
    private String adresse;
    private String email;
    private String identifiant;
    private String secteur_activite;
    private float chiffre_d_affaire;
    private String description;



    public Entreprise() {

    }

    public Integer getId() {
        return entrepriseId;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNom_legal() {
        return nom_legal;
    }

    public void setNom_legal(String nom_legal) {
        this.nom_legal = nom_legal;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdentifiant() {
        return identifiant;
    }

    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }

    public String getSecteur_activite() {
        return secteur_activite;
    }

    public void setSecteur_activite(String secteur_activite) {
        this.secteur_activite = secteur_activite;
    }

    public float getChiffre_d_affaire() {
        return chiffre_d_affaire;
    }

    public void setChiffre_d_affaire(float chiffre_d_affaire) {
        this.chiffre_d_affaire = chiffre_d_affaire;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public Entreprise(Integer id, String nom, String nom_legal, String adresse, String email, String identifiant, String secteur_activite, float chiffre_d_affaire, String description) {
        this.entrepriseId = id;
        this.nom = nom;
        this.nom_legal = nom_legal;
        this.adresse = adresse;
        this.email = email;
        this.identifiant = identifiant;
        this.secteur_activite = secteur_activite;
        this.chiffre_d_affaire = chiffre_d_affaire;
        this.description = description;
    }





}

