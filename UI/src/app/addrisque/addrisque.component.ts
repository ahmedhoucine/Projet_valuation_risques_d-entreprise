import { Component, OnInit } from '@angular/core';
import { RisqueService } from '../risque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrisque',
  templateUrl: './addrisque.component.html',
  styleUrls: ['./addrisque.component.css']
})
export class AddRisqueComponent implements OnInit {

  newRisque: any = {
    nom: '',
    description: '',
    coefficient: 1,
    precaution: ''
  };
  oldrisque: any = null;

  constructor(private risqueService: RisqueService, private router: Router) {}

  ngOnInit(): void {
    const risqueStr = localStorage.getItem('risque');
    if (risqueStr) {
      this.oldrisque = JSON.parse(risqueStr);
      this.newRisque = { ...this.oldrisque };  
    }
  }

  addRisque(): void {
    this.risqueService.addRisque(this.newRisque).subscribe(() => {
      this.router.navigate(['/risquelist']);
    });
  }

  updateRisque(): void {
    this.risqueService.updateRisque(this.newRisque).subscribe(() => {
      this.router.navigate(['/risquelist']);
      localStorage.removeItem('risque');
    });
  }

  onSubmit() {
    if (this.oldrisque) {
      this.updateRisque();
    } else {
      this.addRisque();
    }
  }
}
