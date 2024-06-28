import { Component } from '@angular/core';
import { RisqueService } from '../risque.service';
import { EntrepriseService } from '../entreprise.service';
import * as XLSX from 'xlsx';

import { EntrepriserisqueService } from '../entrepriserisque.service';
import { Entreprise } from '../entreprise.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-analyseclient',
  templateUrl: './analyseclient.component.html',
  styleUrls: ['./analyseclient.component.css']
})
export class AnalyseclientComponent {
  isLoading = false;
  finish= false;
  entreprise: any;
  risque_entreprise: any;
  new_risque: any;
  all_risques: any;
  risque_total =  0;
  coefficient_total = 0;
  entreprise_id=0;
  
  constructor(private router: Router,private risqueService: RisqueService, private entrepriseService: EntrepriseService, private entrepriserisqueservice: EntrepriserisqueService){

  }

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    
    fileReader.readAsArrayBuffer(file);
    
    fileReader.onload = (e) => {
      let arrayBuffer = fileReader.result as ArrayBuffer;
      let data = new Uint8Array(arrayBuffer);
      let arr = new Array();
      
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      
      let bstr = arr.join("");
      let workBook = XLSX.read(bstr, { type: 'binary' });
      let sheetNames = workBook.SheetNames;
      this.entreprise = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      console.log(sheetNames);

      this.risque_entreprise = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[1]]);
      this.new_risque = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[2]]);

      console.log(this.entreprise);
      console.log(this.risque_entreprise);
      console.log(this.new_risque);
      // Accessing each property directly
      this.entreprise= this.entreprise[0]
    }
  }
  voirResultat(){
    localStorage.setItem('entreprise', JSON.stringify(this.entreprise));
    this.router.navigate(['/resultatclient']);
  }
  async onSubmit() {
    this.isLoading = true;

    try {
      // First, add all new_risques
      for (const risque of this.new_risque) {
        try {
          await this.risqueService.addRisque(risque).toPromise();
        } catch (error) {
          console.error('An error occurred while adding a new risque:', error);
          // Continue to the next iteration even if an error occurs
          continue;
        }
      }
  
      // Add entreprise
      const transformedEntreprise = {
        adresse: this.entreprise.Adresse,
        chiffre_d_affaire: this.entreprise['Chiffre d’affaire pour l’année précédente'], 
        description: this.entreprise['Description brève des services/produits de l’entreprise'],
        email: this.entreprise.Email,
        identifiant: this.entreprise['Identifiant de l’entreprise dans l’annuaire national des entreprises'],
        nom_legal: this.entreprise['Nom Legal de l’entreprise'],
        nom: this.entreprise['Nom de l’entreprise'],
        secteur_activite: this.entreprise['Secteur d’activité'],
      };
  
      console.log(this.entreprise);
  
      try {
        await this.entrepriseService.addEntreprise(transformedEntreprise).toPromise();
      } catch (error) {

        console.error('Error response:', error);
      }
  
      // Fetch all_risques
      try {
        this.all_risques = await this.risqueService.getRisques().toPromise();
        console.log(this.all_risques);
      } catch (error) {
        console.error('Error fetching all risques:', error);
        // Continue even if fetching risques fails
      }
  
      // Get entreprise from database
      let entrepriseData: Entreprise | undefined;
      try {
        entrepriseData = await this.entrepriseService.searchEntreprise(transformedEntreprise.nom_legal).toPromise();
        if (!entrepriseData) {
          console.error('Entreprise not found');
        } else {
          this.entreprise_id = entrepriseData.id;
          console.log(entrepriseData);
          console.log(this.entreprise_id);
        }
      } catch (error) {
        console.error('Error searching entreprise:', error);
        // Continue even if searching entreprise fails
      }
      try{
        this.entrepriserisqueservice.deleteAllRisque(this.entreprise_id).toPromise();
        console.log("entreprise risques deleted successfully");
      }catch(error){
        console.error('Error deleting entreprise risques:', error);
      }
  
      // Initialize coefficient_total and risque_total
      this.coefficient_total = 0;
      this.risque_total = 0;
  
      // Check and add risque_entreprise if it exists in all_risques
      const risquePromises = this.risque_entreprise.map(async (risque: any) => {
        try {
          const data:any = await this.risqueService.searchRisque(risque.risque).toPromise();
          console.log(data)
          if (!data) {
            console.error('Risque not found:', risque.risque);
            return;
          }
          const newEntrepriseRisque = {
            entrepriseId: this.entreprise_id,
            risqueId: data.risqueId,
            percentage: risque.porcentage,
          };
          console.log(newEntrepriseRisque);
  
          await this.entrepriserisqueservice.addEntrepriseRisque(newEntrepriseRisque).toPromise();
  
          const coefficient = data.coefficient || 0; 
          this.coefficient_total += coefficient;
          this.risque_total += risque.porcentage * coefficient;
        } catch (error) {
          console.error('An error occurred while searching for or adding a risque:', error);
        }
      });
  
      // Wait for all risque searches to complete
      await Promise.all(risquePromises);
  
      // Calculate final risque_total
      if (this.coefficient_total !== 0) {
        this.risque_total = this.risque_total / this.coefficient_total;
      } else {
        this.risque_total = 0; // Handle case where coefficient_total is 0 to avoid NaN
      }
  
      // Update pourcentage_risque
      try {
        const response = await this.entrepriseService.updatePourcentageRisque(this.entreprise_id, this.risque_total).toPromise();
        this.entreprise=response;
        console.log('Update successful', response);
        // Handle successful update, e.g., show a message to the user
      } catch (error) {
        console.error('Update failed', error);
        // Handle error, e.g., show an error message to the user
      }
  
      console.log(this.risque_total);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.isLoading = false; 
      this.finish= true;
    }
  }
  
}
