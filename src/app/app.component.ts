import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flipkart';
  products : any[];
  searchControl = new FormControl();
  maxPriceControl = new FormControl();
  minRatingControl = new FormControl();

  constructor(private productService: ProductService){
      this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value=> {
        this.productService.search$.next(value);
      });
      this.maxPriceControl.valueChanges.pipe(debounceTime(300)).subscribe(value=> {
        this.productService.maxPrice$.next(value);
      });
      this.minRatingControl.valueChanges.pipe(debounceTime(300)).subscribe(value=> {
        this.productService.rating$.next(value);
      });
  }

}
