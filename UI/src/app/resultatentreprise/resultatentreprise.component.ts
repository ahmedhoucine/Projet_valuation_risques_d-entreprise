import { Component, OnInit } from '@angular/core';
import { EntrepriserisqueService } from '../entrepriserisque.service';

@Component({
  selector: 'app-resultatentreprise',
  templateUrl: './resultatentreprise.component.html',
  styleUrls: ['./resultatentreprise.component.css']
})
export class ResultatentrepriseComponent implements OnInit{
  constructor(private entrepriserisqueservice: EntrepriserisqueService){}
  entreprise: any;
  entreprisestr: any;
  risques: any;
  sorted_risques: any[] | undefined;
  
  async  ngOnInit() {
    this.entreprisestr = localStorage.getItem('entreprise');
    this.entreprise = JSON.parse(this.entreprisestr);
    this.risques= await this.entrepriserisqueservice.getEntrepriseRisques(this.entreprise.id).toPromise();
    console.log(this.risques)
    for(let risque of this.risques){
      risque.pourcentagerisque=risque.percentage*risque.risque.coefficient
        console.log(risque.pourcentagerisque)
    }
    this.risques.sort((a: { pourcentagerisque: number; }, b: { pourcentagerisque: number; }) => b.pourcentagerisque - a.pourcentagerisque );
    console.log(this.risques)
    if (this.risques.length > 3){
      this.risques= this.risques.slice(0, 3);
    }
    console.log(this.risques)
  }
  
}
