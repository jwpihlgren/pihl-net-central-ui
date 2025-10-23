import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts'

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-range-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './range-bar-chart.html',
  styleUrl: './range-bar-chart.css'
})
export class RangeBarChart {
  @ViewChild("chart") chart!: ChartComponent;
  elementRef = inject(ElementRef)

  labels = signal<Element[]>([])
  chartReady = computed(() => {
  })

  x = getComputedStyle(document.body)

  chartOptions: Partial<ChartOptions> = {
    chart: {
      type: "rangeBar",
      foreColor: "#ffffff",
      height: 350,
      events: {
        mounted: (() => {
          const element = this.elementRef.nativeElement as HTMLElement;
          const labels = element.querySelectorAll(".apexcharts-xaxis-label");

          labels.forEach((label: any) => {
            const bbox = label.getBBox();
            const x = bbox.x + bbox.width / 2;
            const y = bbox.y + bbox.height + 5;

            // Material Design cloud icon
            const cloudPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            cloudPath.setAttribute('d', 'M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17C6.36 5.72 5 7.16 5 9c-1.66 0-3 1.34-3 3s1.34 3 3 3h14c1.1 0 2-.9 2-2 0-1.01-.75-1.84-1.65-1.96z');
            cloudPath.setAttribute('fill', '#ffffff');
            cloudPath.setAttribute('stroke', '#666666');
            cloudPath.setAttribute('stroke-width', '0.3');
            cloudPath.setAttribute('transform', `translate(${x - 12}, ${y})`);

            label.parentNode?.appendChild(cloudPath);
          });
        })
      }
    },
    title: {
      text: "Test"
    },
    series: [
      {
        name: "Series 1", data: [
          { x: "2025-01-01", y: [1, 9] },
          { x: "Tisdag", y: [1, 9] },
          { x: "Onsdag", y: [2, 2] },
        ], color: "#5754e8"
      },
    ],
  }

  plotOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 12,
      borderRadiusApplication: "around",
      columnWidth: "24px",
      dataLabels: {
      }
    },
  }


}
