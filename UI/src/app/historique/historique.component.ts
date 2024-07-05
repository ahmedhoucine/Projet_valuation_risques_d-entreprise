import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { EntrepriserisqueService } from '../entrepriserisque.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  constructor(private entrepriseService: EntrepriseService,private entrepriserisqueservice: EntrepriserisqueService){}
  entreprises: any;

  async ngOnInit() {
    this.entreprises = await this.entrepriseService.getEntreprise().toPromise();
    console.log(this.entreprises)
    this.entreprises.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id );

  }
  entreprisederails(entreprise: any){
    localStorage.setItem('entreprise', JSON.stringify(entreprise));

  }
   deleteEntreprisefromhistory(entrepriseid : number){
     this.entrepriserisqueservice.deleteAllRisque(entrepriseid);
     this.entrepriseService.deleteentreprise(entrepriseid).toPromise();
  }

}
