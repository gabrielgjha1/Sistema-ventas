import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/url';

@Pipe({
  name: 'imagenTraer'
})
export class ImagenTraerPipe implements PipeTransform {

  transform(value: string,tipo:string): unknown  {

    let url = URL_SERVICIOS+'/img/';

    if (!value){
     return url+='usuario/xxx';
    }


    switch (tipo){

      case 'consolas':
        url+='consolas/'+value;
        console.log(url);
        break

      case 'zapatos':
      url+='zapatos/'+value;
      console.log(url);
      break

      case 'ropas':
      url+='ropas/'+value;
      console.log(url);
      break
      
      default:
        console.log('no existe')
        url+='usuario/xxx';

    }

    return url;

  }

}
