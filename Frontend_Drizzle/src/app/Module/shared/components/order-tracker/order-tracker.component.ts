import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.scss']
})
export class OrderTrackerComponent {
  @Input() activeStep: any;
  @Input() steps: { id: number; title: string;}[] = [];

  getActiveIndex(): number {
    return this.steps.findIndex(step => step.title === this.activeStep);
  }
}
