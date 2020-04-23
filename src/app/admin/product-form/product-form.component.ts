import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  //id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getAll();


    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
  }
  save(product) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
