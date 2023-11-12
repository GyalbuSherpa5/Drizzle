import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {
  category: any;
  @Input() selectedSection: any;
  navigation: any;

  ngOnInit(){
    this.category = this.navigation;
  }
}
