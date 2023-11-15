import {Component} from '@angular/core';
import {filters, SingleFilter} from "./FilterData";
import {mensPantsPage1} from "../../../../../Data/pants/men_page1";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  filterData: any
  singleFilterData: any;
  menPants: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = SingleFilter;
    this.menPants = mensPantsPage1;

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        console.log(params);
      }
    )
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {

    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    const filterValue = queryParams[sectionId] ? queryParams[sectionId].split(",") : [];

    const valueIndex = filterValue.indexOf(value);

    if (valueIndex != -1) {
      filterValue.splice(valueIndex, 1);
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      queryParams[sectionId] = filterValue.join(",");
    } else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], {queryParams}).then(r => console.log("route success"));
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    queryParams[sectionId] = value;

    this.router.navigate([], {queryParams}).then(r => console.log("route success"));
  }

}
