import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { Product, CATEGORIAS_PRODUCTO } from '../../models/product.model';

type MensajesErrorPorCampo = { [campo: string]: { [validador: string]: string } };

const MENSAJES_ERROR: MensajesErrorPorCampo = {
  nombre: {
    required: 'El nombre del producto es obligatorio.',
    minlength: 'El nombre debe tener al menos 3 caracteres.',
    maxlength: 'El nombre no puede superar los 60 caracteres.'
  },
  descripcion: {
    required: 'La descripción es obligatoria.',
    minlength: 'La descripción debe tener al menos 10 caracteres.',
    maxlength: 'La descripción no puede superar los 200 caracteres.'
  },
  precio: {
    required: 'El precio es obligatorio.',
    min: 'El precio debe ser mayor o igual a 0.01.',
    max: 'El precio no puede superar 999,999.'
  },
  categoria: {
    required: 'Debe seleccionar una categoría.'
  },
  stock: {
    required: 'El stock es obligatorio.',
    min: 'El stock no puede ser negativo.',
    max: 'El stock no puede superar 100,000 unidades.',
    pattern: 'El stock debe ser un número entero (sin decimales).'
  }
};

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categorias: string[] = CATEGORIAS_PRODUCTO;
  productForm: FormGroup;
  enviando = false;
  productoRegistrado: Product | null = null;
  errorEnvio = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]],
      precio: [null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(999999)
      ]],
      categoria: ['', [
        Validators.required
      ]],
      stock: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100000),
        Validators.pattern(/^\d+$/)
      ]]
    });
  }

  get nombre() { return this.productForm.get('nombre'); }
  get descripcion() { return this.productForm.get('descripcion'); }
  get precio() { return this.productForm.get('precio'); }
  get categoria() { return this.productForm.get('categoria'); }
  get stock() { return this.productForm.get('stock'); }

  campoInvalido(nombreCampo: string): boolean {
    const control = this.productForm.get(nombreCampo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  obtenerErrores(nombreCampo: string): string[] {
    const control = this.productForm.get(nombreCampo);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return [];
    }
    return Object.keys(control.errors).map(
      (claveError) => MENSAJES_ERROR[nombreCampo]?.[claveError] ?? 'Campo inválido.'
    );
  }

  onSubmit(): void {
    this.errorEnvio = false;
    this.productoRegistrado = null;

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const producto: Product = this.productForm.value;

    this.productService.registrarProducto(producto).subscribe({
      next: (respuesta) => {
        this.productoRegistrado = respuesta;
        this.enviando = false;
        this.productForm.reset();
      },
      error: () => {
        this.errorEnvio = true;
        this.enviando = false;
      }
    });
  }

  onReset(): void {
    this.productForm.reset();
    this.productoRegistrado = null;
    this.errorEnvio = false;
  }
}