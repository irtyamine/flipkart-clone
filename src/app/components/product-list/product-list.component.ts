import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { map, max } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = combineLatest([
      this.productService.getProducts(), this.productService.search$, this.productService.maxPrice$, this.productService.rating$
    ]).pipe(map(([products, search, maxPrice, rating])=> {
      if(search){
        products = products.filter(p=> p.title.toLowerCase().includes(search.toLowerCase()))
      }
      if(maxPrice){
        products = products.filter(p=> p.price <= maxPrice);
      }
      if(rating){
        products = products.filter(p=> p.rating >= rating);
      }
      return products;
    }));
  }

  ngOnInit(): void {
  }

}
