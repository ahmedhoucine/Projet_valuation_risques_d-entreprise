package com.example.backend.entrepriserisque;

class SimpleEntrepriseRisqueDTO {
    private Integer risqueId;
    private float percentage;

    public SimpleEntrepriseRisqueDTO(Integer risqueId, float percentage) {
        this.risqueId = risqueId;
        this.percentage = percentage;
    }

    // Getters and setters
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