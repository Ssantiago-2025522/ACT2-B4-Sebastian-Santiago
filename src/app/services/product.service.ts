import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productos: Product[] = [
    {
      id: 1,
      nombre: 'Mouse inalámbrico',
      descripcion: 'Mouse ergonómico con conexión bluetooth y batería recargable.',
      precio: 15.99,
      categoria: 'Electrónica',
      stock: 120
    }
  ];

  private nextId = 2;

  constructor() { }

  registrarProducto(producto: Product): Observable<Product> {
    if (!producto.nombre || !producto.categoria) {
      return throwError(() => new Error('Datos de producto incompletos.'));
    }

    const nuevoProducto: Product = {
      ...producto,
      id: this.nextId++
    };

    return of(nuevoProducto).pipe(
      delay(800),
      tap((productoGuardado) => {
        this.productos.push(productoGuardado);
        console.log('[ProductService] Producto recibido y almacenado:', productoGuardado);
      })
    );
  }

  obtenerProductos(): Product[] {
    return [...this.productos];
  }
}