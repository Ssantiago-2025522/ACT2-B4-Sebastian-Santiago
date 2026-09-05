export interface Product {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
}

export const CATEGORIAS_PRODUCTO: string[] = [
  'Electrónica',
  'Ropa',
  'Alimentos',
  'Hogar',
  'Juguetes'
];