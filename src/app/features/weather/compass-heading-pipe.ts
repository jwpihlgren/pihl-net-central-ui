import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compassHeading',
})
export class CompassHeadingPipe implements PipeTransform {

  transform(degrees: number): string {
    if (degrees < 0 || degrees > 360) return ""
    if (degrees >= 360 - 22.5 || degrees <= 22.5) return "N"
    else if (degrees <= 22.5 * 3) return "NE"
    else if (degrees <= 22.5 * 5) return "E"
    else if (degrees <= 22.5 * 7) return "SE"
    else if (degrees <= 22.5 * 9) return "S"
    else if (degrees <= 22.5 * 11) return "SW"
    else if (degrees <= 22.5 * 13) return "W"
    else if (degrees <= 22.5 * 15) return "NW"
    else return ""
  }

}
