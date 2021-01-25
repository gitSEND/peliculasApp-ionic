import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  textoBuscar: string;
  peliculas: Pelicula[] = [];
  ideas = ['spiderman', 'batman', 'la vida es bella', 'el señor de los anillos'];
  buscando = false;

  constructor(private moviesService: MoviesService, private modalController: ModalController) {}

  buscar(event) {
    const valor: string = event.detail.value;
    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas(valor).subscribe((resp) => {
      this.peliculas = resp.results;
      this.buscando = false;
    });
  }

  async detalle(id: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });
    modal.present();
  }
}
