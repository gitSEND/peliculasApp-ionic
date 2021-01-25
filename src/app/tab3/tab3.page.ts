import { Component, OnInit } from '@angular/core';
import { DetalleMovie, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private dataLocalService: DataLocalService, private moviesService: MoviesService) {}

  peliculas: DetalleMovie[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: DetalleMovie[]) {
    this.favoritoGenero = [];
    generos.forEach((genero) => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter((peli) => peli.genres.find((genre) => genre.id === genero.id)),
      });
    });
    console.log(this.favoritoGenero);
  }
}
