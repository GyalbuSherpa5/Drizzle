import {Component} from '@angular/core';
import {UserService} from "../../../../State/User/user.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-user-kyc',
  templateUrl: './view-user-kyc.component.html',
  styleUrls: ['./view-user-kyc.component.scss']
})
export class ViewUserKycComponent {

  data: any;
  frontImage: any;
  backImage: any;

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  ngOnInit() {

    this.router.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserKyc(userId)
        .subscribe((data: any) => {
          this.data = data;
          this.frontImage = 'data:image/jpg;base64,' + data.citizenFront;
          this.backImage = 'data:image/jpg;base64,' + data.citizenBack;
        });
    });
  }

  goBack() {
    this.location.back();
  }
}
