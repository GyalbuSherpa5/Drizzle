import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OrderService} from "../../../../State/service/order.service";
import {AdminService} from "../../../admin/service/admin.service";
import {MatTabGroup} from "@angular/material/tabs";
import {ReviewRatingService} from "../../../../State/service/review-rating.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  orders!: Order;

  steps = [
    {id: 0, title: "PLACED"},
    {id: 1, title: "CONFIRMED"},
    {id: 2, title: "SHIPPED"},
    {id: 3, title: "DELIVERED"},
  ];
  activeStep: string = '';

  review: string = '';

  maxRatings = 5;
  initialRating = 0;
  currentRating = this.initialRating;
  stars: any;
  isRated = false;
  clickedStarIndex: number | undefined;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  rating: number = 0;
  userReview!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private orderService: OrderService,
    private reviewRatingService: ReviewRatingService,
  ) {
    this.stars = Array(this.maxRatings).fill(0).map((_, i) => i + 1);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      let data: any;
      this.route.queryParamMap.subscribe(queryParams => {
        data = queryParams.get('data');
      });

      if (data != undefined) {
        this.adminService.changeOrderStatus(id, 'confirmed').subscribe({
          next: () => {
            this.orderService.changePaymentStatus(id, 'COMPLETED')
              .subscribe(() => {
              });
            this.orderService.getOrderById(id)
              .subscribe((orderData: Order) => {
                this.orders = orderData;
                this.setActiveStep(orderData.orderStatus);
              });
          },
          error: (error: any) => {
            console.log(error);
          }
        });

      }

      this.orderService.getOrderById(id)
        .subscribe((orderData: Order) => {
          this.orders = orderData;
          this.setActiveStep(orderData.orderStatus);
          this.reviewRatingService.getRatingByProductId(this.orders.orderItems[0].product.id)
            .subscribe((rating: Rating) => {
              this.rating = rating.rating;
            });
          this.reviewRatingService.getReviewByProductId(this.orders.orderItems[0].product.id)
            .subscribe((review: Review) => {
              this.userReview = review.review;
            });
        });

    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  setActiveStep(orderStatus: string) {
    switch (orderStatus) {
      case 'PENDING':
        this.activeStep = 'PLACED';
        break;
      case 'CONFIRMED':
        this.activeStep = 'CONFIRMED';
        break;
      case 'SHIPPED':
        this.activeStep = 'SHIPPED';
        break;
      case 'DELIVERED':
        this.activeStep = 'DELIVERED';
        break;
      default:
        this.activeStep = '';
    }
  }

  rate(rating: number, index: number) {
    this.currentRating = rating;
    this.isRated = true;
    this.clickedStarIndex = index;

    const reqData = {
      productId: this.orders.orderItems[0].product.id,
      rating: index + 1,
    };

    this.reviewRatingService.addRating(reqData)
      .subscribe((rating: Rating) => {
        this.rating = rating.rating;
      });
  }

  submitReview() {

    const reqData = {
      productId: this.orders.orderItems[0].product.id,
      review: this.review
    };

    this.reviewRatingService.addReview(reqData)
      .subscribe((review: Review) => {
        this.userReview = review.review;
        this.review = '';
        this.tabGroup.selectedIndex = 1;
      });
  }

  cancelOrder() {

  }

  proceedOrder() {
    const id = this.orders.id;
    this.router.navigate([`/checkout/payment/${id}`], {
      queryParams: {step: '3', order_id: id}
    }).then(() => console.log("route success"));
  }
}
