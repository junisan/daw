import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {BasesPage} from "../pages/bases/bases";
import {Ieee2DecPage} from "../pages/ieee2-dec/ieee2-dec";
import {AboutPage} from "../pages/about/about";

import {StorageProvider} from "../providers/storage/storage";
import {Dec2IeeePage} from "../pages/dec2-ieee/dec2-ieee";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = AboutPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
                public storage: StorageProvider) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'Bases', component: BasesPage},
            {title: 'IEEE 2 Dec', component: Ieee2DecPage},
            {title: 'Dec 2 IEEE', component: Dec2IeeePage},
            {title: 'Acerca de', component: AboutPage}
            // { title: 'List', component: ListPage }
        ];

    }

    initializeApp() {
        //Determina que ventana debe cargar
        if (this.storage.getVariable('first-use') !== null) {
            //Ya ha aceptado las condiciones. Dejarle ir a Home
            this.rootPage = HomePage;
            // this.rootPage = Dec2IeeePage;
        } else {
            //Todavía no ha ejecutado el programa. Que acepte condiciones
            this.rootPage = AboutPage;
        }

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
