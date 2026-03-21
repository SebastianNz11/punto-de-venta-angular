import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { CreateProductoDto } from '../interfaces/crear-producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private urlProductos = 'https://punto-venta-backend-hphi.onrender.com/producto';
  private http = inject(HttpClient);

  productos = signal<Producto[]>([]);
  productoEditando = signal<Producto | null>(null);

  loadProductos() {
    this.http.get<Producto[]>(this.urlProductos).subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.error(err)
    });
  }

  postProducto(producto: CreateProductoDto) {
    this.http.post<Producto>(this.urlProductos, producto).subscribe((nuevo) => {
      this.productos.update(productos => [
        ...productos,
        nuevo
      ]);
      alert('Producto creado');
    });
  }

  deleteProducto(id: string) {
    this.http.delete<void>(`${this.urlProductos}/${id}`).subscribe({
      next: () => {
        this.productos.update(productos =>
          productos.filter(p => p.id !== id)
        );
      },
      error: (err) => console.error(err)
    });
    alert('Producto eliminado');
  }

  updateProducto(id: string, producto: CreateProductoDto) {
    this.http.put<Producto>(`${this.urlProductos}/${id}`, producto).subscribe(actualizado => {
      this.productos.update(productos =>
        productos.map(p => p.id === id ? actualizado : p)
      );
    });
    alert('Producto actualizado');
  }

  seleccionarProducto(producto: Producto) {
    this.productoEditando.set(producto);
  }

  cancelarEdicion() {
    this.productoEditando.set(null);
  }

}
