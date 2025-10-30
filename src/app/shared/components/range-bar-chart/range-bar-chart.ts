import { Component, ElementRef, inject, input, InputSignal, ViewChild } from '@angular/core';
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
import { WeatherIcon } from '../weather-icon/weather-icon';

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
    const inputOptions = this.options();
    return {
      ...this.defaultOptions,
      ...inputOptions,
      chart: {
        ...this.defaultOptions.chart,
        ...inputOptions.chart
      },
      yaxis: {
        ...this.defaultOptions.yaxis,
        ...inputOptions.yaxis
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

  options = input.required<Partial<ChartOptions>>({});
  labelIcons = input<string[]>()

  protected defaultOptions: Partial<ChartOptions> = {
    chart: {
      type: "rangeBar",
      foreColor: "#ffffff",
      height: 350,
      toolbar: { show: false },
      events: {
        mounted: () => {
          const element = this.elementRef.nativeElement as HTMLElement;
          const labels = element.querySelectorAll(".apexcharts-xaxis-label");
          labels.forEach((label, index) => {
            if (!this.labelIcons() || !this.labelIcons()![index]) return;
            const iconSvg = this.labelIcons()![index];
            const bbox = (label as SVGGraphicsElement).getBBox();

            // Create a group to contain the icon
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

            // Parse the SVG string properly
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${iconSvg}</svg>`, 'image/svg+xml');
            const svgElement = doc.documentElement;

            // Append all children to the group
            Array.from(svgElement.children).forEach(child => {
              group.appendChild(document.importNode(child, true));
            });

            label.parentNode?.appendChild(group);

            // Get the group's bounding box
            const groupBBox = group.getBBox();

            // Define desired icon size
            const targetSize = 20;
            const scale = targetSize / Math.max(groupBBox.width, groupBBox.height);

            // Calculate position to center under label
            const scaledWidth = groupBBox.width * scale;
            const x = bbox.x + (bbox.width / 2) - (scaledWidth / 2);
            const y = bbox.y + bbox.height + 8;


            // Apply transform
            group.setAttribute('transform',
              `translate(${x - groupBBox.x * scale}, ${y - groupBBox.y * scale}) scale(${scale})`
            );
          });
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "24px",
        borderRadius: 2,
        borderRadiusApplication: "around",
      }
    },
    yaxis: {
      forceNiceScale: false,
    },

    dataLabels: {
      enabled: false
    }
  };
}
