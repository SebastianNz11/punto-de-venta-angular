import { Component, inject, OnInit } from '@angular/core';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detalle-ventas-table',
  imports: [CurrencyPipe],
  templateUrl: './detalle-ventas-table.html',
  styleUrl: './detalle-ventas-table.css',
})
export class DetalleVentasTable implements OnInit {

  detalleService = inject(DetalleVentaService);

  ngOnInit() {
    this.detalleService.loadDetalles();
  }

  deleteDetalle(id: string) {
    this.detalleService.deleteDetalle(id);
  }

}
