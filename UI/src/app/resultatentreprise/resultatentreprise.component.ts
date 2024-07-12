import { Component, OnInit } from '@angular/core';
import { EntrepriserisqueService } from '../entrepriserisque.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_Fonts';
import { AgentEntrepriseService } from '../agent-entreprise.service';
import { FileService } from '../file-service.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-resultatentreprise',
  templateUrl: './resultatentreprise.component.html',
  styleUrls: ['./resultatentreprise.component.css']
})
export class ResultatentrepriseComponent implements OnInit{
  constructor(private fileService: FileService,private agentEntrepriseService: AgentEntrepriseService,private entrepriserisqueservice: EntrepriserisqueService){}
  entreprise: any;
  entreprisestr: any;
  risques: any;
  sorted_risques: any[] | undefined;
  agents: any;
  entrepriseId:any;
  csvData: any[] = [];
  final_agents: any[] = [];


  getAgentsByEntreprise(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.agentEntrepriseService.getAgentsByEntreprise(id).subscribe(
        data => {
          this.agents = data;
          console.log('Agents :', this.agents);
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }
  async fetchCsvData(filename: string) {
    try {
      this.csvData = await this.fileService.readCsv(filename).toPromise();
      // Continue with any additional processing using this.csvData
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      // Handle error here
    }
  }
   calculateAverage(processedData: any): any {
    let sum = 0;
    let coefficient=0;
    processedData.forEach((item: any[]) => {
        sum =sum+ parseFloat(item[1]); // assuming item[1] is the number you want to sum up
        coefficient +=1;
    });
    console.log("coefficeinet = ",coefficient)
    console.log("sum=", sum)
    let average = sum / (processedData.length-1)
    console.log("average=",average)
    return average;
}
  
  
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
      this.sorted_risques= this.risques.slice(0, 3);
    }else{
      this.sorted_risques=this.risques
    }
    console.log(this.sorted_risques)
    this.entrepriseId=this.entreprise.id;
    await this.getAgentsByEntreprise(this.entrepriseId);
    for (let agent of this.agents){
      
      const file_parts = agent.filePath.split("\\")
      console.log(file_parts)
      const filename = file_parts[file_parts.length - 1]
      console.log(filename)
      await this.fetchCsvData(filename);
      this.csvData.shift();
      console.log(this.csvData)
      
      let processedData = this.csvData.map(item => {
        // Concatenate all parts except the last one
        let concatenatedText = item.slice(0, -1).join('');
        
        // Remove quotes from all parts
        let cleanedText = concatenatedText.replace(/"/g, '');
    
        // Keep the number part separately
        let numberPart = item[item.length - 1];
    
        return [cleanedText, numberPart];
    });
    const average = await this.calculateAverage(processedData);
    console.log(average)
    processedData.unshift(average)
    processedData.unshift(agent.position)



    let agentname = filename.replace(/_/g, ' ').replace('.csv', '');
    processedData.unshift(agentname)
    console.log(processedData);
    this.final_agents.push(processedData)
    
  }
  console.log(this.final_agents)
      

    
  }
    
  
  

  public generatePdf() {
    const logo = 'data:image/jpeg;base64,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';
    const documentDefinition = {
      content: [
        { text: 'Resultat de l\'analyse', style: 'title',absolutePosition: { x: 200, y: 20 } },
        { text: ' ', style: 'content' },
        {
          image: logo,
          width: 80,
          absolutePosition: { x: 450, y: 20 }
        },
        { text: 'Information d\'entreprise', style: 'header' },
        {
          text: [
            { text: 'Nom: ', bold: true },
            `${this.entreprise.nom}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Nom Legal: ', bold: true },
            `${this.entreprise.nom_legal}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Adresse: ', bold: true },
            `${this.entreprise.adresse}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Email: ', bold: true },
            `${this.entreprise.email}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Identifiant: ', bold: true },
            `${this.entreprise.identifiant}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: "Secteur d'Activite: ", bold: true },
            `${this.entreprise.secteur_activite}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Chiffre d\'Affaire: ', bold: true },
            `${this.entreprise.chiffre_d_affaire}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Description: ', bold: true },
            `${this.entreprise.description}`
          ],
          style: 'content'
        },
        {
          text: [
            { text: 'Pourcentage Risque: ', bold: true },
            `${this.entreprise.pourcentagerisque.toFixed(2)}%`
          ],
          style: 'content'
        },
        { text: ' ', style: 'content' },

        { text: 'Les Risques', style: 'header' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: 'red'
        },
        content: {
          fontSize: 12
        },
        title: {
          fontSize: 24,
          bold: true,
          color: 'red'

        },
        article: {
          fontSize: 12,
          bold: true,
          color: 'black'
        },
        resultat: {
          fontSize: 12,
          bold: true,
          color: 'red'
        }
        
      }
    };
  
    this.risques.forEach((element: any) => {
      documentDefinition.content.push({
        text: [
          { text: '- Nom: ', bold: true },
          `${element.risque.nom}`
        ],
        style: 'content'
      });
      documentDefinition.content.push({
        text: [
          { text: '- Description: ', bold: true },
          `${element.risque.description}`
        ],
        style: 'content'
      });
      documentDefinition.content.push({
        text: [
          { text: '- Précaution: ', bold: true },
          `${element.risque.precaution}`
        ],
        style: 'content'
      });
      documentDefinition.content.push({
        text: [
          { text: '- Coefficient: ', bold: true },
          `${element.risque.coefficient}`
        ],
        style: 'content'
      });
      // Add a blank line to separate each 'risque'
      documentDefinition.content.push({ text: ' ', style: 'content' });
    });
    documentDefinition.content.push({
      text: 'Quelques articles sur les décideurs:', style: 'header'
    });
    this.final_agents.forEach((element: any) =>{
      documentDefinition.content.push({
        text:[
          `${element[0]}`,{ text: ' Le ', bold: true },`${element[1]}`,{ text: ' de ', bold: true },`${this.entreprise.nom}`

        ],style: 'article'
      });
      for(let article of element.slice(3)){
        documentDefinition.content.push({
          text:[
            `${article[0]}`
  
          ],style: 'content'
        });
        documentDefinition.content.push({ text: ' ', style: 'content' });

      }
      documentDefinition.content.push({
        text:[
          { text: 'Resultat de l analyse de ces articles: ', bold: true }, 
          { text: `${element[2].toFixed(2)}`, bold:true } 

        ],style: 'resultat'
      });
      documentDefinition.content.push({ text: ' ', style: 'content' });    
    });
    return(documentDefinition);
  }
  openpdf(){
    pdfMake.createPdf(this.generatePdf()).open();

  }
  downloadpdf(){
    pdfMake.createPdf(this.generatePdf()).download();
  }
}