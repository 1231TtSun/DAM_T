import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataqualityComponent} from "./dataquality/dataquality.component";
import {ProgressComponent} from "./progress/progress.component";
import {RouterModule, Routes} from "@angular/router";
import {RedundancyComponent} from './redundancy/redundancy.component';
import {IntegrityComponent} from './integrity/integrity.component';


const routes: Routes=[
  { path: 'dashboard', component:  DataqualityComponent},
  { path: 'progress', component: ProgressComponent},
  { path: 'redundancy', component: RedundancyComponent},
  { path: 'integrity', component: IntegrityComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ]
})
export class DataqualityRoutingModule { }
