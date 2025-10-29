import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  imports: [],
  templateUrl: './weather-icon.html',
  styleUrl: './weather-icon.css'
})

export class WeatherIcon {
  iconIndex = input.required<number>();
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number>('md');
  stroke = input<string>('#FFA500');
  strokeWidth = input<number>(1.5);

  private readonly sizeMap: Record<string, number> = {
    'xs': 16,
    'sm': 24,
    'md': 32,
    'lg': 48,
    'xl': 64,
    '2xl': 96
  };

  sizeValue = computed(() => {
    const size = this.size();
    return typeof size === 'number' ? size : this.sizeMap[size];
  });
}

