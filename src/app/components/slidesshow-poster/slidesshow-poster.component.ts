import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slidesshow-poster',
  templateUrl: './slidesshow-poster.component.html',
  styleUrls: ['./slidesshow-poster.component.scss'],
})
export class SlidesshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async verDetalle(id: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });
    modal.present();
  }
}
