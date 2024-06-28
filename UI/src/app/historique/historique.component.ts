import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  constructor(private entrepriseService: EntrepriseService){}
  entreprises: any[] | undefined;

  async ngOnInit() {
    this.entreprises = await this.entrepriseService.getEntreprise().toPromise();
    console.log(this.entreprises)
  }
  entreprisederails(entreprise: any){
    localStorage.setItem('entreprise', JSON.stringify(entreprise));

  }

}
