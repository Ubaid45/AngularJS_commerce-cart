import { take } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product) {

    let cartId = await this.getOrCreateCartId();

    let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).valueChanges();

    let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.pipe(take(1)).subscribe(item => {
      if (item === null) {
        item$$.set({ product: product, quantity: 1 });
        console.log('adding new product to cart');
      } else {
        item$$.update({ quantity: item.quantity + 1 });
        console.log('updating exisiting product '); ``
      }
    });
  }

   private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
   }

   private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
  }
/*
   private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }*/

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

}
