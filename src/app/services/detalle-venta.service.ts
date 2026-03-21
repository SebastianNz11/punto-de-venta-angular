import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DetalleVenta } from '../interfaces/detalle-venta.interface';
import { CreateDetalleVentaDto } from '../interfaces/crear-detalle-venta.interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleVentaService {

  private urlDetalles = 'https://punto-venta-backend-hphi.onrender.com/detalle-venta';
  // Wait, User originally specified: "...esta para usuarioPOST http://localhost:3000/usuario".
  // Assuming the backend has `/detalle-ventas` or `/detalle-venta`.
  private http = inject(HttpClient);

  detalles = signal<DetalleVenta[]>([]);
  detalleEditando = signal<DetalleVenta | null>(null);

  loadDetalles() {
    this.http.get<DetalleVenta[]>(this.urlDetalles).subscribe({
      next: (data) => this.detalles.set(data),
      error: (err) => console.error(err)
    });
  }

  postDetalle(detalle: CreateDetalleVentaDto) {
    this.http.post<DetalleVenta>(this.urlDetalles, detalle).subscribe((nuevo) => {
      this.detalles.update(detalles => [
        ...detalles,
        nuevo
      ]);
      alert('Detalle de venta creado');
    });
  }

  deleteDetalle(id: string) {
    console.log("ID enviado al backend:", id);
    this.http.delete<void>(`${this.urlDetalles}/${id}`).subscribe({
      next: () => {
        this.detalles.update(detalles =>
          detalles.filter(d => d.id !== id)
        );
      },
      error: (err) => console.error(err)
    });
    alert('Detalle de venta eliminado');
  }

  updateDetalle(id: string, detalle: CreateDetalleVentaDto) {
    this.http.put<DetalleVenta>(`${this.urlDetalles}/${id}`, detalle).subscribe(actualizado => {
      this.detalles.update(detalles =>
        detalles.map(d => d.id === id ? actualizado : d)
      );
    });
    alert('Detalle de venta actualizado');
  }

  seleccionarDetalle(detalle: DetalleVenta) {
    this.detalleEditando.set(detalle);
  }

  cancelarEdicion() {
    this.detalleEditando.set(null);
  }

}
