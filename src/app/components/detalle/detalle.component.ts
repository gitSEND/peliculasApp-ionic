import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, DetalleMovie, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  pelicula: DetalleMovie = {};
  actores: Cast[] = [];
  oculto = 150;
  slidesOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };
  estrella = 'star-outline';
  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController,
    private dataLocalService: DataLocalService
  ) {}

  ngOnInit() {
    this.dataLocalService.existePelicula(this.id).then((resp) => {
      this.estrella = resp ? 'star' : 'star-outline';
    });

    this.moviesService.getPeliculaDetalle(this.id).subscribe((resp) => {
      this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe((resp) => {
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    const existe = this.dataLocalService.guardarPelicula(this.pelicula);
    this.estrella = existe ? 'star' : 'star-outline';
  }
}
