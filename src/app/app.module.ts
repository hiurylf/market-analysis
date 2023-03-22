import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TableComponent,
        ChartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgChartsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
