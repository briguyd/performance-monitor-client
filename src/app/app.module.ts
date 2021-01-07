import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CpuChartComponent } from './cpu-chart/cpu-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BackgroundPicturesComponent } from './background-pictures/background-pictures.component';
import { MemoryChartComponent } from './memory-chart/memory-chart.component';
import { GpuChartComponent } from './gpu-chart/gpu-chart.component';
import { CpuTimelineComponent } from './cpu-timeline/cpu-timeline.component';
import { FormsModule } from '@angular/forms';
import { TemperatureMonitorComponent } from './temperature-monitor/temperature-monitor.component';
import { NetworkMonitorComponent } from './network-monitor/network-monitor.component';
import { LocalTimeComponent } from './local-time/local-time.component';
import { LocalWeatherComponent } from './local-weather/local-weather.component';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [
    AppComponent,
    CpuChartComponent,
    GpuChartComponent,
    MemoryChartComponent,
    BackgroundPicturesComponent,
    CpuTimelineComponent,
    TemperatureMonitorComponent,
    NetworkMonitorComponent,
    LocalTimeComponent,
    LocalWeatherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule,
    FormsModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
