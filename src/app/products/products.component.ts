import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : any;
  filteredProducts : Product[];
  category: string;
  subscription: Subscription;
  cart: any;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {

    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    })
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe((cart) => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
