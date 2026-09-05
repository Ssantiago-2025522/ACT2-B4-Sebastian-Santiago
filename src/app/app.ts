import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('registro-productos');
}
