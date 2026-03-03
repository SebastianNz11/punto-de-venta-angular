import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente-service';

@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.html',
  styleUrl: './clientes-table.css',
})
export class ClientesTable implements OnInit {

  clienteService = inject(ClienteService);

  ngOnInit() {
    this.clienteService.loadClientes();
  }

  deleteCliente(id: string) {
    this.clienteService.deleteCliente(id);
  }

}
