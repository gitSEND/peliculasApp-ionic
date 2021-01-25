import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidesshowBackdropComponent } from './slidesshow-backdrop/slidesshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlidesshowPosterComponent } from './slidesshow-poster/slidesshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [SlidesshowBackdropComponent, SlidesshowPosterComponent, SlideshowParesComponent, DetalleComponent],
  exports: [SlidesshowBackdropComponent, SlidesshowPosterComponent, SlideshowParesComponent, DetalleComponent],
  imports: [CommonModule, IonicModule, PipesModule],
})
export class ComponentsModule {}
