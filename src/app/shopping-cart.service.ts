import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product) {
    this.updateItem(product, 1);

  }

  async removeFromCart(product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: any, change: number) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      item$.update({product: product, quantity: (item ? item.quantity : 0) + change});
    });
  }

   private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
   }

   private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

   async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map((x:any) => new ShoppingCart(x.items)));
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }



}
