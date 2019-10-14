import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataqualityRoutingModule } from './dataquality-routing.module';
import { DataqualityComponent } from './dataquality/dataquality.component';
import { ProgressComponent } from './progress/progress.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { IntegrityComponent } from './integrity/integrity.component';
import { RedundancyComponent } from './redundancy/redundancy.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material';
import {MatSortModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatDividerModule, MatListModule} from '@angular/material';
import {NbCardModule, NbIconModule, NbListModule, NbSelectModule} from '@nebular/theme';

@NgModule({
  declarations: [DataqualityComponent, ProgressComponent, IntegrityComponent, RedundancyComponent],
  imports: [
    CommonModule,
    DataqualityRoutingModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    NzButtonModule,
    MatCardModule,
    MatSelectModule,
    NgxEchartsModule,
    MatDividerModule,
    MatListModule,
    NbCardModule,
    NbSelectModule,
    NbListModule,
    NbIconModule
  ],
  exports: [
    DataqualityComponent,
    ProgressComponent,
    IntegrityComponent,
    RedundancyComponent
  ]
})
export class DataqualityModule { }

