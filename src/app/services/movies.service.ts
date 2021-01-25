import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, Pelicula, CreditsMovie, DetalleMovie, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private popularesPage = 1;
  generos: Genre[] = [];
  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;
    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(
      `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}&api_key=5e45fc80d8a57c6b81d3184112401c2f`
    );
  }

  getPeliculaDetalle(id: string) {
    /**
     * para que no se genere esta url en base a this.ejecutarQuery(`/movie/${id}`);
     * https://api.themoviedb.org/3/movie/775996&api_key=5e45fc80d8a57c6b81d3184112401c2f
     * aplicaremos un artificio, a continuacion
     */
    return this.ejecutarQuery<DetalleMovie>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<CreditsMovie>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise((resolve) => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp: any) => {
        this.generos = resp.genres;
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }
}
