import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe {
    // Add your code here
    transform(value: any): string {
        if (!value) {
          return '';
        }
    const date = new Date(value);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
    }
}
