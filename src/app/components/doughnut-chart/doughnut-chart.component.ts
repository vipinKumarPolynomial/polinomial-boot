import { Component, OnInit, } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: Label[] = ['Total Revenue', 'Total Volume'];
  public doughnutChartData: MultiDataSet = [
    [350, 450],
    [50, 150],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
    this.doughnutChartLabels = ["Test 1","Test 2"];
  }

}
