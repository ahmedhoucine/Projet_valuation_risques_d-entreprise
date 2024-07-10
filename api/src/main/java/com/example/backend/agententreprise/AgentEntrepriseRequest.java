package com.example.backend.agententreprise;

public class AgentEntrepriseRequest {
    private Integer entrepriseId;
    private String filePath;

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
}
