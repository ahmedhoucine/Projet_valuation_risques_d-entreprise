import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RisquelistComponent } from './risquelist/risquelist.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddRisqueComponent } from './addrisque/addrisque.component';
import { EditrisqueComponent } from './editrisque/editrisque.component';
import { AnalyseclientComponent } from './analyseclient/analyseclient.component';
import { ResultatentrepriseComponent } from './resultatentreprise/resultatentreprise.component';
import { HistoriqueComponent } from './historique/historique.component';
import { StatsComponent } from './stats/stats.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RisquelistComponent,
    AddRisqueComponent,
    EditrisqueComponent,
    AnalyseclientComponent,
    ResultatentrepriseComponent,
    HistoriqueComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
