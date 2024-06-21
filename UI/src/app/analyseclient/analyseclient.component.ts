import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-analyseclient',
  templateUrl: './analyseclient.component.html',
  styleUrls: ['./analyseclient.component.css']
})
export class AnalyseclientComponent {
  ExcelData: any;

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
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      console.log(this.ExcelData);
    }
  }
}
