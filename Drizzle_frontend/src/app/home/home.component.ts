import {Component} from '@angular/core';
import {menJeans} from "../../Data/Men/men_jeans";
import {gounsPage1} from "../../Data/Gouns/gouns";
import {lehngacholiPage2} from "../../Data/Saree/lenghaCholiPage2";
import {mensShoesPage1} from "../../Data/shoes";

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
    this.Iphone = menJeans.splice(0, 5);
    this.Laptop = gounsPage1.splice(0, 5);
    this.Camera = lehngacholiPage2.splice(0, 5);
    this.Printer = mensShoesPage1.splice(0, 5);
  }
}
