import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

    getAll() {
      return this.db.list('/products')
        .snapshotChanges().pipe(
        map(actions =>
          actions.map(a => ({
            key: a.payload.key, ...(a.payload.val() as Product)
          }))
        )
      );
    }

    get(productId) {
      return this.db.object('/products/' + productId).valueChanges();
    }

    update(productId, product) {
      return this.db.object('/products/' + productId).update(product);
    }

    delete(productId) {
      return this.db.object('/products/' + productId).remove();
    }
}
