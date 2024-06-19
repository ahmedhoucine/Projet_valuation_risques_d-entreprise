import { Component, OnInit } from '@angular/core';
import { RisqueService } from '../risque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risquelist',
  templateUrl: './risquelist.component.html',
  styleUrls: ['./risquelist.component.css']
})
export class RisquelistComponent implements OnInit {

  risques: any[] = [];

  constructor(private risqueService: RisqueService,private router: Router) { }

  ngOnInit(): void {
    this.fetchRisques();
  }

  fetchRisques(): void {
    this.risqueService.getRisques().subscribe(data => {
      this.risques = data;
      console.log(this.risques); 
    });
  }
  deleteRisque(index: number): void {
    const risque = this.risques[index];
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.risqueService.deleteRisque(risque.id).subscribe(() => {
        this.risques.splice(index, 1);
      });
    }
  }
  editRisque(risque : any){
    localStorage.setItem('risque', JSON.stringify(risque));
    this.router.navigate(['/editrisque']);
  }
}
