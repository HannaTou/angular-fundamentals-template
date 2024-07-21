import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})

export class DurationPipe {
    // Add your code here
    transform(value: any): string {
        if (!value) {
          return '';
        }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    
    return `${this.pad(hours)}:${this.pad(minutes)} hours`;
    }
    
    pad(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }
}
