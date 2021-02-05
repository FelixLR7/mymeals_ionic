import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list;
  @Input() type: string = "";
  @Input() searchColumn: string = "";

  urlNew: string;
  searchValue: string = "";

  constructor(private router: Router, private toastController: ToastController) { 

  }

  ngOnInit() {
    this.type = this.type.toLowerCase();
    this.urlNew = "/new" + this.type;
  }

  update(id) {
    this.router.navigate([this.urlNew, id]);
  }

  delete(id) {
    let method = "delete" + this.type[0].toUpperCase() + this.type.slice(1);
    
    // this.databaseService[method](id).then( res => {
    //   if(res) {
    //     this.presentToast("Se ha eliminado correctamente");
    //   }
    //   else {
    //     this.presentToast("Ha habido un error al eliminar el elemento");
    //   }
    // });
  }

  search(event) {
    this.searchValue = event.detail.value;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    
    toast.present();
  }
}
