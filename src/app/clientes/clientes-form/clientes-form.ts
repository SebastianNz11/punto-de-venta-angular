import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente-service';

@Component({
  selector: 'app-clientes-form',
  imports: [ReactiveFormsModule],
  templateUrl: './clientes-form.html',
  styleUrl: './clientes-form.css',
})
export class ClientesForm {
  clienteService = inject(ClienteService)
  fb = inject(FormBuilder);

  formCliente: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    nit: ['', [Validators.required, Validators.min(8)]],
    email: ['', [Validators.required]],
  })



constructor() {
    effect(() => {
      const cliente = this.clienteService.clienteEditando();
      if (cliente) {
        this.formCliente.patchValue(cliente);
      }
    });
  }

  guardarCliente() {
    if (this.formCliente.invalid) return;
    const cliente = this.formCliente.getRawValue();
    const clienteEdit = this.clienteService.clienteEditando();
    if (clienteEdit) {
      this.clienteService.updateCliente(clienteEdit.id, cliente);
      this.cancelar();
    } else {
      this.clienteService.postCliente(cliente);
    }
    this.formCliente.reset();
  }

  cancelar() {
    this.clienteService.cancelarEdicion();
    this.formCliente.reset();
  }
}
