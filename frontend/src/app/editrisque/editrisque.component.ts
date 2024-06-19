import { Component, OnInit } from '@angular/core';
import { RisqueService } from '../risque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editrisque',
  templateUrl: './editrisque.component.html',
  styleUrls: ['./editrisque.component.css']
})
export class EditrisqueComponent implements OnInit {
  risque = {
    nom: '',
    description: '',
    coefficient: null,
    precaution: ''
  };
  oldrisque: any;

  constructor(private risqueService: RisqueService,private router: Router) { }

  ngOnInit(): void {
    const risqueStr = localStorage.getItem('risque');
    if (risqueStr) {
      this.oldrisque = JSON.parse(risqueStr);
      this.risque = { ...this.oldrisque };  
    }
  }

  // Method to update the risque
  updateRisque(): void {
    this.risqueService.updateRisque(this.risque).subscribe(() => {
      this.router.navigate(['/risquelist']);
    });
  }
}
