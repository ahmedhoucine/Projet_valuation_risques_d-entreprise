import { Component, OnInit} from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { EntrepriserisqueService } from '../entrepriserisque.service';
import { RisqueService } from '../risque.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);




@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  constructor(private entrepriseService: EntrepriseService,private entrepriserisqueservice: EntrepriserisqueService,private risqueService: RisqueService){}
  entreprises: any;
  risques: any;
  entrepriserisque: any;
  entreprise_risque: any;
  risque_count: any;
  entrepriserisque2:any;
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];

  async ngOnInit() {
    this.entreprises = await this.entrepriseService.getEntreprise().toPromise();
    this.entrepriserisque = [];

for (let entreprise of this.entreprises) {
  const id = entreprise.id;
  this.risques = await this.entrepriserisqueservice.getEntrepriseRisques(id).toPromise();
  this.entrepriserisque.push(this.risques);
  console.log(this.risques);
}
this.entrepriserisque.sort((a: any, b : any) => {
  return b.length - a.length;
})
    
  
    this.entreprises.sort((a: { pourcentagerisque: number; }, b: { pourcentagerisque: number; }) => b.pourcentagerisque - a.pourcentagerisque );
    this.entreprises= this.entreprises.slice(0, 3);
    this.entrepriserisque= this.entrepriserisque.slice(0, 3);

    console.log(this.entreprises)
    console.log(this.entrepriserisque)
    console.log(this.entrepriserisque[0][0].entreprise.nom)

  
    this.entrepriserisque2 = await this.entrepriserisqueservice.getEntrepriseRisque().toPromise()
    console.log(this.entrepriserisque2)
    this.risques = await this.risqueService.getRisques().toPromise()
    console.log(this.risques)



    
    let risqueCounts: any[] = this.risques.map((risque:any) => {
      const count = this.entrepriserisque2.filter(
        (entrepriseRisque :any) => entrepriseRisque.risque.risqueId === risque.risqueId
      ).length;
      return {
        risqueId: risque.risqueId,
        nom: risque.nom,
        count,
      };
    });
    console.log(risqueCounts);

    risqueCounts.sort((a: { count: number; }, b: { count: number; }) => b.count - a.count );
    risqueCounts= risqueCounts.slice(0, 5);

    
    console.log(risqueCounts);
    this.chartdata=risqueCounts;
    for(let i=0; i<this.chartdata.length ;i++){
      this.labeldata.push(this.chartdata[i].nom);
      this.realdata.push(this.chartdata[i].count);
    }
    this.RenderChart(this.labeldata,this.realdata,'pie','piechart');


  }
  RenderChart(labeldata:any,maindata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: 'nombre d\'entreprise qui posséde ce risque',
          data: maindata,
          backgroundColor:['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)']     ,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    


  }

}