import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-product-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './product-chart.component.html',
  styleUrl: './product-chart.component.scss'
})
export class ProductChartComponent {
  chartData: any[] = [];
 
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.products$.subscribe((products) => {
      this.chartData = products.map((product) => ({
        name: product.name,
        value: product.price,
      }));
    });
  }
}
