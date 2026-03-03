import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Cliente } from '../interfaces/cliente-interface';
import { CreateClienteDto } from '../interfaces/crear-cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private urlClientes = 'http://localhost:3000/cliente';
  private http = inject(HttpClient);

  clientes = signal<Cliente[]>([]);
  clienteEditando = signal<Cliente | null>(null);

  loadClientes() {
    this.http.get<Cliente[]>(this.urlClientes).subscribe({
      next: (data) => this.clientes.set(data),
      error: (err) => console.error(err)
    });
  }

  postCliente(cliente: CreateClienteDto) {
  this.http.post<Cliente>(this.urlClientes, cliente).subscribe((nuevo) => {

    this.clientes.update(clientes => [
      ...clientes,
      nuevo
    ]);
     alert('Cliente creado')
  });
}

  deleteCliente(id: string) {
    this.http.delete<void>(`${this.urlClientes}/${id}`).subscribe({
      next: () => {
        this.clientes.update(clientes =>
          clientes.filter(c => c.id !== id)
        );
      },
      error: (err) => console.error(err)
    });
     alert('Cliente eliminado')
  }

   updateCliente(id: string, cliente: CreateClienteDto) {
    this.http.put<Cliente>(`${this.urlClientes}/${id}`, cliente).subscribe(actualizado => {
      this.clientes.update(clientes =>
        clientes.map(c => c.id === id ? actualizado : c)
      );
    });
     alert('Cliente actualizado')
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteEditando.set(cliente);
  }

  cancelarEdicion() {
    this.clienteEditando.set(null);
  }

}
