import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  constructor(productSerive: ProductService) {
    this.products$ = productSerive.getAll();
    console.log(this.products$);
   }



}
