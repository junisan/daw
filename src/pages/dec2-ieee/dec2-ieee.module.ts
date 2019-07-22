import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dec2IeeePage } from './dec2-ieee';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    Dec2IeeePage,
  ],
  imports: [
    IonicPageModule.forChild(Dec2IeeePage),
    PipesModule
  ],
})
export class Dec2IeeePageModule {}
