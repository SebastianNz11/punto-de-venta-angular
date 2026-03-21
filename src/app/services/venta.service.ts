import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Venta } from '../interfaces/venta.interface';
import { CreateVentaDto } from '../interfaces/crear-venta.interface';

@Injectable({
  providedIn: 'root',
})
export class VentaService {

  private urlVentas = 'https://punto-venta-backend-hphi.onrender.com/venta';
  private http = inject(HttpClient);

  ventas = signal<Venta[]>([]);
  ventaEditando = signal<Venta | null>(null);

  loadVentas() {
    this.http.get<Venta[]>(this.urlVentas).subscribe({
      next: (data) => this.ventas.set(data),
      error: (err) => console.error(err)
    });
  }

  postVenta(venta: CreateVentaDto) {
    this.http.post<Venta>(this.urlVentas, venta).subscribe((nueva) => {
      this.ventas.update(ventas => [
        ...ventas,
        nueva
      ]);
      alert('Venta creada');
    });
  }

  deleteVenta(id: string) {
    this.http.delete<void>(`${this.urlVentas}/${id}`).subscribe({
      next: () => {
        this.ventas.update(ventas =>
          ventas.filter(v => v.id !== id)
        );
      },
      error: (err) => console.error(err)
    });
    alert('Venta eliminada');
  }

  updateVenta(id: string, venta: CreateVentaDto) {
    this.http.put<Venta>(`${this.urlVentas}/${id}`, venta).subscribe(actualizada => {
      this.ventas.update(ventas =>
        ventas.map(v => v.id === id ? actualizada : v)
      );
    });
    alert('Venta actualizada');
  }

  seleccionarVenta(venta: Venta) {
    this.ventaEditando.set(venta);
  }

  cancelarEdicion() {
    this.ventaEditando.set(null);
  }

}
