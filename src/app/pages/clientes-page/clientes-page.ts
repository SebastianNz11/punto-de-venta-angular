import { Component } from '@angular/core';
import { ClientesTable } from "../../clientes/clientes-table/clientes-table";
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";
import { ClientesForm } from "../../clientes/clientes-form/clientes-form";

@Component({
  selector: 'app-clientes-page',
  imports: [ClientesTable, ClientesForm],
  templateUrl: './clientes-page.html',
  styleUrl: './clientes-page.css',
})
export default class ClientesPage {}
