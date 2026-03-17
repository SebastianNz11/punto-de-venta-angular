import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-productos-table',
  imports: [DatePipe],
  templateUrl: './productos-table.html',
  styleUrl: './productos-table.css',
})
export class ProductosTable implements OnInit {

  productoService = inject(ProductoService);

  ngOnInit() {
    this.productoService.loadProductos();
  }

  deleteProducto(id: string) {
    this.productoService.deleteProducto(id);
  }

}
