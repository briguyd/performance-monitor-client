import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cpu-timeline',
  templateUrl: './cpu-timeline.component.html',
  styleUrls: ['./cpu-timeline.component.scss']
})
export class CpuTimelineComponent implements OnInit {
  @Input() hwData: any;

  formattedData: any[];
  view: any[] = [350, 180];

  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  hwDataInitialized = false;

  constructor() { }

  ngOnInit(): void {
    this.formatHWData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formatHWData();
  }

  private initHWData() {
    this.formattedData = [];
    if (this.hwData?.Children) {
      for (const child of this.hwData.Children) {
        if (child.Text === 'Load') {
          this.formattedData = [];
          for (const loadChild of child.Children) {
            if (loadChild.Text != 'CPU Total') {
              this.formattedData.push({ name: loadChild.Text, series: [] });
            }
          }
          this.hwDataInitialized = true;
        }
      }
    }
  }


  private formatHWData() {
    if (!this.hwDataInitialized) {
      this.initHWData();
    }
    if (this.hwData?.Children) {
      for (const child of this.hwData.Children) {
        if (child.Text === 'Load') {
          const currentTime = new Date();
          for (const loadChild of child.Children) {
            if (loadChild.Text != 'CPU Total') {
              const series = this.formattedData.filter((data) => data.name === loadChild.Text);
              if (series && series.length > 0) {
                // only show last few data points
                if (series[0].series.length >= 15) {
                  series[0].series.shift();
                }
                series[0].series.push({name: currentTime, value: parseFloat(loadChild.Value)})
              }
            }
          }
        }
      }
    }
    this.formattedData = [...this.formattedData];
  }
}
