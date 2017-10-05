import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the AplicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aplicacion',
  templateUrl: 'aplicacion.html',
})
export class AplicacionPage {

  qrData = null;
  createdCode = null;
  scannedCode = null;
  usuario: string;
  credito: number;

  usuarios: FirebaseListObservable<any>;
  creditos: FirebaseListObservable<any>;
  cargas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, db: AngularFireDatabase, public alertCtrl: AlertController) {

    this.usuario = this.navParams.get('usuario');

    this.usuarios = db.list('/usuarios');
    this.creditos = db.list('/creditos');
    this.cargas = db.list('/' + this.usuario);

    this.creditos.forEach(element => {
      for (let i in element) {
        //console.log(element[i]);
        if (element[i].$key == this.usuario) {
          this.credito = element[i].credito;

        }
      }
    })
    console.log("usuario: " + this.usuario + " ---credito: " + this.credito);
  }

  createCode() {
    this.createdCode = this.qrData;
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.cargarCredito(barcodeData.text);
    })

  }

  ///////////////////
  cargarCredito(num) {

    if (!this.verificarCredito(num)) {

      var creditoAgregado: number;
      switch (num) {
        case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f': {
          creditoAgregado = 100;
          this.cargas.push(num);
          let alert = this.alertCtrl.create({
            title: 'Resultado!',
            subTitle: 'Gestion de carga exitosa, se agregaran ' + creditoAgregado + ' creditos a su cuenta',
            buttons: ['OK']
          });
          alert.present();
        }
          break;

        case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ': {
          creditoAgregado = 50;
          this.cargas.push(num);
          let alert = this.alertCtrl.create({
            title: 'Resultado!',
            subTitle: 'Gestion de carga exitosa, se agregaran ' + creditoAgregado + ' creditos a su cuenta',
            buttons: ['OK']
          });
          alert.present();
        }

          break;

        case '8c95def646b6127282ed50454b73240300dccabc': {
          creditoAgregado = 10;
          this.cargas.push(num);
          let alert = this.alertCtrl.create({
            title: 'Resultado!',
            subTitle: 'Gestion de carga exitosa, se agregaran ' + creditoAgregado + ' creditos a su cuenta',
            buttons: ['OK']
          });
          alert.present();
        }

          break;
        default: {
          let alert = this.alertCtrl.create({
            title: 'SEGUI PARTICIPANDO!',
            subTitle: 'No se reconoce el codigo escaneado',
            buttons: ['OK']
          });
          alert.present();
        }
          break;
      }

      var nuevoCredito: number = this.credito + creditoAgregado;
      this.creditos.update(this.usuario, { credito: nuevoCredito })
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'SEGUI PARTICIPANDO!',
        subTitle: 'Ya se ha cargado este codigo a su cuenta',
        buttons: ['OK']
      });
      alert.present();
      //console.log("ya se cargo");
    }
  }

  verificarCredito(num) {
    var flag = 0;
    this.cargas.forEach(element => {
      for (let i in element) {
        //console.log("element i-" + i + ": " + element[i].$value);
        if (element[i].$value == num) {
          flag = 1;
          return flag;
        }
      }
    });
    return flag;
  }

  verCredito(num) {
    this.cargas.forEach(element => {

      for (let i in element) {

        //console.log(element[i].$value + "num: " + num);
        if (element[i].$value == num) {
          //console.log("oasdasdoaosd");
          return;
        }
      }
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AplicacionPage');
  }

}
