import { Component } from '@angular/core';
import { ProductosTable } from "../../productos/productos-table/productos-table";
import { ProductosForm } from "../../productos/productos-form/productos-form";

@Component({
  selector: 'app-productos-page',
  imports: [ProductosTable, ProductosForm],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export default class ProductosPage {}
