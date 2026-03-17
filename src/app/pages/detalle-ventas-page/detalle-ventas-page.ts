import { Component } from '@angular/core';
import { DetalleVentasTable } from "../../detalle-ventas/detalle-ventas-table/detalle-ventas-table";
import { DetalleVentasForm } from "../../detalle-ventas/detalle-ventas-form/detalle-ventas-form";

@Component({
  selector: 'app-detalle-ventas-page',
  imports: [DetalleVentasTable, DetalleVentasForm],
  templateUrl: './detalle-ventas-page.html',
  styleUrl: './detalle-ventas-page.css',
})
export default class DetalleVentasPage {}
