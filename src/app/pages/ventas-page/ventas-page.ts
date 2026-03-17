import { Component } from '@angular/core';
import { VentasTable } from "../../ventas/ventas-table/ventas-table";
import { VentasForm } from "../../ventas/ventas-form/ventas-form";

@Component({
  selector: 'app-ventas-page',
  imports: [VentasTable, VentasForm],
  templateUrl: './ventas-page.html',
  styleUrl: './ventas-page.css',
})
export default class VentasPage {}
