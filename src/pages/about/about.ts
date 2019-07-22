import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    firstUse: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public storage: StorageProvider) {
        this.firstUse = this.storage.getVariable('first-use') === null;
    }

    acepta(){
        this.storage.writeVariable('first-use', '1');
        this.navCtrl.setRoot(HomePage);
    }

}
