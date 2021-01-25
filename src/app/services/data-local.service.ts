import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { DetalleMovie } from '../interfaces/interfaces';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  peliculas: DetalleMovie[] = [];
  constructor(private toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });

    toast.present();
  }

  guardarPelicula(pelicula: DetalleMovie) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregado al storage';
    }

    Storage.set({ key: 'peliculas', value: JSON.stringify(this.peliculas) });
    this.presentToast(mensaje);

    return !existe;
  }

  async cargarFavoritos() {
    const peliculas = await Storage.get({ key: 'peliculas' });
    this.peliculas = JSON.parse(peliculas.value) || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find((peli) => peli.id === id);
    return existe ? true : false;
  }
}
