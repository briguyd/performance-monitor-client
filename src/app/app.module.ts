import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CpuChartComponent } from './cpu-chart/cpu-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BackgroundPicturesComponent } from './background-pictures/background-pictures.component';
import { MemoryChartComponent } from './memory-chart/memory-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CpuChartComponent,
    MemoryChartComponent,
    BackgroundPicturesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
