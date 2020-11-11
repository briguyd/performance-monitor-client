import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cpu-chart',
  templateUrl: './cpu-chart.component.html',
  styleUrls: ['./cpu-chart.component.scss']
})
export class CpuChartComponent implements OnInit {

  @Input() hwData: any;

  formattedData: any[];
  view: any[] = [230, 200];
  legend: boolean = false;
  legendPosition: string = 'below';

  public boundFormatter = this.formatMiddleValue.bind(this);

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {

  }

  ngOnInit(): void {
    this.formatHWData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formatHWData();
  }

  public getLoad() {
    if (this.hwData?.Children) {
      for (const child of this.hwData.Children) {
        if (child.Text === 'Load') {
          return child;
        }
      }
    }
  }

  private formatHWData() {
    if (this.hwData?.Children) {
      for (const child of this.hwData.Children) {
        if (child.Text === 'Load') {
          this.formattedData = [];
          for (const loadChild of child.Children) {
            if (loadChild.Text != 'CPU Total') {
              this.formattedData.push({ name: loadChild.Text, value: parseFloat(loadChild.Value) });
            }
          }
        }
      }
    }
  }

  public formatMiddleValue(args: any) {
    if (this.formattedData) {
      return (args / this.formattedData.length).toFixed(0) + '%';
    }
    return NaN + '%';
  }
}
