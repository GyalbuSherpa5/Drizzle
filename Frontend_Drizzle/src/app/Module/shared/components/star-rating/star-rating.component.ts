import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() numberOfStars: number = 3;
  currentRating = 0;
  stars: number[];

  constructor() {
    this.stars = [];
  }

  ngOnChanges() {
    this.stars = Array(this.numberOfStars).fill(0).map((_, i) => i + 1);
  }

  rate(rating: number) {
    this.currentRating = rating;
  }

}
