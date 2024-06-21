package com.example.backend.entrepriserisque;

import com.example.backend.entreprise.model.Entreprise;
import com.example.backend.risque.model.Risque;
import jakarta.persistence.*;

@Entity
@Table(name = "entreprise_risque")
public class EntrepriseRisque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entreprise_risque_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise;

    @ManyToOne
    @JoinColumn(name = "risque_id")
    private Risque risque;

    @Column(name = "percentage")
    private float percentage;

    public EntrepriseRisque() {
    }

    public EntrepriseRisque(Entreprise entreprise, Risque risque, float percentage) {
        this.entreprise = entreprise;
        this.risque = risque;
        this.percentage = percentage;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public Risque getRisque() {
        return risque;
    }

    public void setRisque(Risque risque) {
        this.risque = risque;
    }

    public float getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }
}
