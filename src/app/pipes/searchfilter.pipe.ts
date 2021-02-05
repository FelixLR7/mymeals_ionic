import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(array: any[], searchValue: string, field: string): any[] {
    if(searchValue === "") {
      return array;
    }

    searchValue = searchValue.toLowerCase();

    return array.filter( item => {
      return item[field].toLowerCase().includes(searchValue);
    });
  }

}
