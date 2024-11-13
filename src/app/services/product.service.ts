// services/product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.modal';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);

  products$ = this.productsSubject.asObservable();

  addProduct(product: Product) {
    this.products.push(product);
    this.updateProducts();
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index >= 0) {
      this.products[index] = updatedProduct;
      this.updateProducts();
    }
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
    this.updateProducts();
  }
  
   updateProducts() {
    this.productsSubject.next([...this.products]);
  }
}
