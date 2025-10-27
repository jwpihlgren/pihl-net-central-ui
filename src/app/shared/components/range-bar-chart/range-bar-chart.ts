import { Component, ElementRef, inject, input, InputSignal, OnInit, ViewChild } from '@angular/core';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexTooltip,
  ApexStroke,
  ApexLegend,
  ApexPlotOptions
} from 'ng-apexcharts'

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  plotOptions?: ApexPlotOptions;
};

@Component({
  template: ``
})
abstract class BaseChartComponent {
  abstract options: InputSignal<Partial<ChartOptions>>;
  protected abstract defaultOptions: Partial<ChartOptions>;

  get mergedOptions(): ChartOptions {
    return {
      ...this.defaultOptions,
      ...this.options(),
      chart: {
        ...this.defaultOptions.chart,
        ...this.options().chart
      }
    } as ChartOptions;
  }
}

@Component({
  selector: 'app-range-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './range-bar-chart.html',
  styleUrl: './range-bar-chart.css'
})
export class RangeBarChart extends BaseChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  elementRef = inject(ElementRef);

  options = input<Partial<ChartOptions>>({});

  protected defaultOptions: Partial<ChartOptions> = {
    chart: {
      type: "rangeBar",
      foreColor: "#ffffff",
      height: 350,
      toolbar: { show: false },
      events: {
        mounted: () => {
          const element = this.elementRef.nativeElement as HTMLElement;
          const labels = element.querySelectorAll(".apexcharts-yaxis-label");
          labels.forEach((label, index) => {
            label.parentNode?.querySelectorAll(`path.custom-icon`).forEach((n) => n.remove());

            const series = this.options().series;
            if (!series || !series[0] || !series[0].data) return;

            const dataPoint = series[0].data[index] as any;
            if (!dataPoint || !dataPoint.icon) return;

            const bbox = (label as SVGGraphicsElement).getBBox();
            const x = bbox.x + bbox.width + 10;
            const y = bbox.y + bbox.height / 2;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', dataPoint.icon);
            path.setAttribute('fill', '#ffffff');
            path.setAttribute('stroke', '#666666');
            path.setAttribute('stroke-width', '0.3');
            path.classList.add('custom-icon');
            path.setAttribute('transform', `translate(${x}, ${y - 12})`);

            label.parentNode?.appendChild(path);
          });
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "24px",
        borderRadius: 12,
        borderRadiusApplication: "around",
      }
    },
    dataLabels: {
      enabled: false
    }
  };
}
