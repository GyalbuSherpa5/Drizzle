import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../State/service/product.service";
import {CartService} from "../../../../State/service/cart.service";
// @ts-ignore
import {AddItemRequest} from "src/app/Module/feature/components/model/Data";
import {MessageService} from "../../../shared/components/MessageService";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  selectedSize: any;
  reviews = [1, 1, 1];
  relatedProducts: any;
  productId!: number;
  selectedProduct: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    let category = '';

    this.productService.findProductById(this.productId)
      .subscribe((value) => {
        this.selectedProduct = value;
        category = this.selectedProduct.category.parentCategory.name;
        this.productService.findProductByCategoryName(category)
          .subscribe((value) => {
            console.log(value);
            this.relatedProducts = value;
          });
      });
  }

  handleAddToCart() {

    const reqData: AddItemRequest = {
      productId: this.productId,
      quantity: 1,
      price: this.selectedProduct.price,
    };

    this.cartService.addItemToCart(reqData)
      .subscribe(() => {
        this.messageService.showSuccessSnackBar('Item added to cart');
      });
    // this.router.navigate(['cart']).then(value => console.log("route success"));
  }
}
