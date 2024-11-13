import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.modal';
import { CommonModule, NgIf } from '@angular/common';
import { ProductChartComponent } from "../product-chart/product-chart.component";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [TableModule, DialogModule, DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, NgIf, ProductChartComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  products: Product[] = [];
  selectedProduct:any= null;
  productModal = false;
  productForm: FormGroup;
  shograph: boolean=false;
  i=0;
  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }

  openProductModal() {
    this.productModal = true;
    this.productForm.reset();
  }
  openGraph(){
    this.shograph=true;
  }
  openTablemodal(){
    this.shograph=false;

  }
  editProduct(product: Product) {
    this.productModal = true;
    this.productForm.patchValue(product);
  }

  saveProductInformation() {
    if (!this.productForm.invalid) {
    var productData = this.productForm.value;
    if (productData.id) {
      this.productService.updateProduct(productData);
    } else {
      productData.id=++this.i;
      console.log(productData);

      this.productService.addProduct(productData);
    }
  }
    this.productModal = false;
  }
  cancel(){
    this.productModal = false;
  }
  
  deleteProduct(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id!);
    }
  }
}