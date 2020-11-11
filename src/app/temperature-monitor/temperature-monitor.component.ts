import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-temperature-monitor',
  templateUrl: './temperature-monitor.component.html',
  styleUrls: ['./temperature-monitor.component.scss']
})
export class TemperatureMonitorComponent implements OnInit {

  @Input() cpuData;
  @Input() gpuData;

  cpuTemp: number;
  gpuTemp: number;
  constructor() { }

  ngOnInit(): void {
    this.setTemperatures();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setTemperatures();
  }

  setTemperatures() {
    if (this.cpuData?.Children) {
      for (const child of this.cpuData.Children) {
        if (child.Text === 'Temperatures') {
          for (const loadChild of child.Children) {
            if (loadChild.Text === 'Core Average') {
              this.cpuTemp = loadChild.Value;
            }
          }
        }
      }
    }

    if (this.gpuData?.Children) {
      for (const child of this.gpuData.Children) {
        if (child.Text === 'Temperatures') {
          for (const loadChild of child.Children) {
            if (loadChild.Text === 'GPU Core') {
              this.gpuTemp = loadChild.Value;
            }
          }
        }
      }
    }
  }

}
