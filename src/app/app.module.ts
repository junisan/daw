import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AboutPageModule} from "../pages/about/about.module";
import {BasesPageModule} from "../pages/bases/bases.module";
import {Ieee2DecPageModule} from "../pages/ieee2-dec/ieee2-dec.module";
import {Dec2IeeePageModule} from "../pages/dec2-ieee/dec2-ieee.module";

import {PipesModule} from "../pipes/pipes.module";

import { StorageProvider } from '../providers/storage/storage';
import { IeeeProvider } from '../providers/ieee/ieee';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AboutPageModule,
        BasesPageModule,
        Dec2IeeePageModule,
        Ieee2DecPageModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        StorageProvider,
        IeeeProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
