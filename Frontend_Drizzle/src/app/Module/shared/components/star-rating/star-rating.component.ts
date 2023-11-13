import {Component} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  maxRatings = 5;
  initialRating = 3;
  currentRating = 0;
  stars: any;

  constructor() {
    this.stars = Array(this.maxRatings).fill(0).map((_, i) => i + 1);
    this.currentRating = this.initialRating;
  }

  rate(rating: number) {
    this.currentRating = rating;
  }

}
