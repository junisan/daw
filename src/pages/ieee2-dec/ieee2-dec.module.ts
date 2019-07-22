import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ieee2DecPage } from './ieee2-dec';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    Ieee2DecPage,
  ],
  imports: [
    IonicPageModule.forChild(Ieee2DecPage),
    PipesModule
  ],
})
export class Ieee2DecPageModule {}
