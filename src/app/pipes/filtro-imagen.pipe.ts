import { Pipe, PipeTransform } from '@angular/core';
import { DetalleMovie } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen',
})
export class FiltroImagenPipe implements PipeTransform {
  transform(peliculas: DetalleMovie[]): any[] {
    return peliculas.filter((peli) => peli.backdrop_path !== null);
  }
}
