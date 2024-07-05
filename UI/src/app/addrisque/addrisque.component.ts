import { Component, OnInit } from '@angular/core';
import { RisqueService } from '../risque.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  errorMessage:any;

  constructor(private risqueService: RisqueService, private router: Router) {}

  ngOnInit(): void {
    const risqueStr = localStorage.getItem('risque');
    if (risqueStr) {
      this.oldrisque = JSON.parse(risqueStr);
      this.newRisque = { ...this.oldrisque };  
    }
  }

  addRisque(): void {
    this.risqueService.addRisque(this.newRisque).subscribe(
      () => {
        this.router.navigate(['/risquelist']);
      },
      (error) => {
        this.errorMessage = 'nom déja utiliser'; // Capture error message from backend
      }
    );
  }

  updateRisque(): void {
    this.risqueService.updateRisque(this.newRisque).subscribe(
      () => {
        this.router.navigate(['/risquelist']);
        localStorage.removeItem('risque');
      },
      (error) => {
        this.errorMessage = 'nom déja utiliser'; // Capture error message from backend
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
  }
    this.errorMessage = ''; // Clear previous error message
    if (this.oldrisque) {
      this.updateRisque();
    } else {
      this.addRisque();
    }
  }
}
