import {Component} from '@angular/core';
import {iPhone} from "../../../../../Data/Men/men_jeans";
import {mac} from "../../../../../Data/Gouns/gouns";
import {camera} from "../../../../../Data/Saree/lenghaCholiPage2";
import {mensShoesPage1} from "../../../../../Data/shoes";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Iphone: any;
  Laptop: any;
  Camera: any;
  Printer: any;

  ngOnInit() {
    this.Iphone = iPhone.splice(0, 5);
    this.Laptop = mac.splice(0, 5);
    this.Camera = camera.splice(0, 5);
    this.Printer = mensShoesPage1.splice(0, 5);
  }
}
