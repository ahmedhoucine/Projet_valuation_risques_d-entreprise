package com.example.backend.agententreprise;

public class AgentEntrepriseRequest {
    private Integer entrepriseId;
    private String filePath;
    private String position;
    private Float resultat;

    // Getters and setters
    public Integer getEntrepriseId() {
        return entrepriseId;
    }

    public void setEntrepriseId(Integer entrepriseId) {
        this.entrepriseId = entrepriseId;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Float getResultat() {
        return resultat;
    }

    public void setResultat(Float resultat) {
        this.resultat = resultat;
    }
}
