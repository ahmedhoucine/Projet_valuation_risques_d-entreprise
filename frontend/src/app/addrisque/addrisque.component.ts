import { Component } from '@angular/core';
import { RisqueService } from '../risque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrisque',
  templateUrl: './addrisque.component.html',
  styleUrls: ['./addrisque.component.css']
})
export class AddRisqueComponent {
  newRisque = {
    nom: '',
    description: '',
    coefficient: null,
    precaution: ''
  };

  constructor(private risqueService: RisqueService, private router: Router) {}

  addRisque(): void {
    this.risqueService.addRisque(this.newRisque).subscribe(() => {
      this.router.navigate(['/risquelist']);
    });
  }
}
