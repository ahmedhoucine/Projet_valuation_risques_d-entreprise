package com.example.backend.agententreprise;
import com.example.backend.entreprise.model.Entreprise;
import jakarta.persistence.*;

@Entity
@Table(name = "agent_entreprise")
public class AgentEntreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-one relationship with Entreprise
    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise;

    @Column(name = "file_path")
    private String filePath;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
