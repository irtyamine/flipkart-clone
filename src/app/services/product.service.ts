import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /** Filters */
  search$ =  new BehaviorSubject<string>('');
  maxPrice$ =  new BehaviorSubject<number>(undefined);
  rating$ =  new BehaviorSubject<number>(undefined);

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<Product[]>('/assets/products.json')
  }
}
