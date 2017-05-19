import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hideFirstChar'})
export class HideFirstChar implements PipeTransform {
  transform(value: string):string {
    return value.substring(1);
  }
}
