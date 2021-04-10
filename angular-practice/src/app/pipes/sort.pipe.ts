import { Pipe, PipeTransform } from '@angular/core';

interface Server {
  instanceType: string;
  name: string;
  status: string;
  started: Date;
}

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Server[], propName: string): Server[] {
    if (value.length === 0) {
      return value
    }
    return value.sort((a, b) => {
      const valA = a[propName].toLowerCase();
      const valB = b[propName].toLowerCase();

      if (valA > valB) {
        return 1
      } else {
        return -1
      }
    });
  }

}
