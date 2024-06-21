import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RisquelistComponent } from './risquelist/risquelist.component';
import { AddRisqueComponent } from './addrisque/addrisque.component';
import { EditrisqueComponent } from './editrisque/editrisque.component';
import { AnalyseclientComponent } from './analyseclient/analyseclient.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'risquelist', component: RisquelistComponent },
  { path: 'addrisque', component: AddRisqueComponent },
  { path: 'editrisque', component: EditrisqueComponent },
  { path: 'analyseclient', component: AnalyseclientComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
