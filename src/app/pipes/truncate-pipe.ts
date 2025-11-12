import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 30): string {
    if (!value) return '';
    
    const text = String(value); 

    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    
    return text;
  }
}