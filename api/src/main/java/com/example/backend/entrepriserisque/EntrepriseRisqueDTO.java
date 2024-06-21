package com.example.backend.entrepriserisque;

public class EntrepriseRisqueDTO {
    private Integer entrepriseId;
    private Integer risqueId;
    private float percentage;

    public EntrepriseRisqueDTO() {
    }

    public EntrepriseRisqueDTO(Integer entrepriseId, Integer risqueId, float percentage) {
        this.entrepriseId = entrepriseId;
        this.risqueId = risqueId;
        this.percentage = percentage;
    }

    public Integer getEntrepriseId() {
        return entrepriseId;
    }

    public void setEntrepriseId(Integer entrepriseId) {
        this.entrepriseId = entrepriseId;
    }

    public Integer getRisqueId() {
        return risqueId;
    }

    public void setRisqueId(Integer risqueId) {
        this.risqueId = risqueId;
    }

    public float getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }
}
