import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { ClienteService } from '../../services/cliente-service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ventas-form',
  imports: [ReactiveFormsModule],
  templateUrl: './ventas-form.html',
  styleUrl: './ventas-form.css',
})
export class VentasForm implements OnInit {
  ventaService = inject(VentaService);
  clienteService = inject(ClienteService);
  usuarioService = inject(UsuarioService);
  fb = inject(FormBuilder);

  formVenta: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    id_usuario: ['', [Validators.required]],
    id_cliente: ['', [Validators.required]],
  });

  ngOnInit() {
    this.clienteService.loadClientes();
    this.usuarioService.loadUsuarios();
  }

  constructor() {
    effect(() => {
      const venta = this.ventaService.ventaEditando();
      if (venta) {
        const formattedDate = new Date(venta.fecha).toISOString().split('T')[0];
        this.formVenta.patchValue({
           ...venta,
           fecha: formattedDate
        });
      }
    });
  }

  guardarVenta() {
    if (this.formVenta.invalid) return;
    const venta = {
      fecha: new Date(this.formVenta.value.fecha).toISOString(), // Formato ISO 8601 con Z
      usuarioId: String(this.formVenta.value.id_usuario),
      clienteId: String(this.formVenta.value.id_cliente)
    };
    const ventaEdit = this.ventaService.ventaEditando();
    if (ventaEdit) {
      this.ventaService.updateVenta(ventaEdit.id, venta);
      this.cancelar();
    } else {
      this.ventaService.postVenta(venta);
    }
    this.formVenta.reset();
  }

  cancelar() {
    this.ventaService.cancelarEdicion();
    this.formVenta.reset();
  }
}
