import { Component, inject, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ventas-table',
  imports: [DatePipe],
  templateUrl: './ventas-table.html',
  styleUrl: './ventas-table.css',
})
export class VentasTable implements OnInit {

  ventaService = inject(VentaService);

  ngOnInit() {
    this.ventaService.loadVentas();
  }

  deleteVenta(id: string) {
    this.ventaService.deleteVenta(id);
  }

}
