import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-cpu-chart',
  templateUrl: './cpu-chart.component.html',
  styleUrls: ['./cpu-chart.component.scss']
})
export class CpuChartComponent implements OnInit {

  @Input() hwData: any;
  private svg: any;

  private formatPercent = d3.format(".0%");
  private margin = 50;
  private width = 135; // 750 - (this.margin * 2);
  private height = 135; //400 - (this.margin * 2);
  private data = [
    { "Framework": "Vue", "Stars": "166443", "Released": "2014" },
    { "Framework": "React", "Stars": "150793", "Released": "2013" },
    { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
    { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
    { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
  ];
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawMeter(parseFloat(this.getLoad()?.Children[0]?.Value));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.drawMeter(parseFloat(this.getLoad()?.Children[0]?.Value));
  }

  private createSvg(): void {
    this.svg = d3.select("figure#cpu").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }

  private drawMeter(data: any) {
    if (isNaN(data)) {
      return;
    }
    var
      twoPi = 2 * Math.PI,
      progress = 0,
      allocated = data,
      total = 100,
      formatPercent = d3.format(".0%");

    var arc = d3.arc()
      .startAngle(0)
      .innerRadius(52)
      .outerRadius(66);

    // var svg = d3.select("figure#cpu").append("svg")
    //   .attr("width", this.width)
    //   .attr("height", this.height)
    //   .append("g")
    //   .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

    var meter = this.svg.append("g")
      .attr("class", "funds-allocated-meter");

    meter.append("path")
      .attr("class", "background")
      .attr("d", arc.endAngle(twoPi));

    var foreground = meter.append("path")
      .attr("class", "foreground");

    var percentComplete = meter.append("text")
      .attr("text-anchor", "middle")
      .attr("class", "percent-complete")
      .attr("dy", "0em");

    var description = meter.append("text")
      .attr("text-anchor", "middle")
      .attr("class", "description")
      .attr("dy", "2.3em")
      .text("Total Complete");

    var i = d3.interpolate(progress, allocated / total);

    d3.transition().duration(1000).tween("progress", function () {
      return function (t) {
        progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress));
        percentComplete.text(formatPercent(progress));
      };
    });
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
}
