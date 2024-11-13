import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductChartComponent } from './component/product-chart/product-chart.component';
import { ProductTableComponent } from './component/product-table/product-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./component/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductChartComponent, ProductTableComponent, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud_app';
}
