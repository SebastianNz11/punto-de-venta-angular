import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detalle-ventas-form',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './detalle-ventas-form.html',
  styleUrl: './detalle-ventas-form.css',
})
export class DetalleVentasForm implements OnInit {
  detalleService = inject(DetalleVentaService);
  productoService = inject(ProductoService);
  ventaService = inject(VentaService);
  fb = inject(FormBuilder);

  formDetalle: FormGroup = this.fb.group({
    id_producto: ['', [Validators.required]],
    id_venta: ['', [Validators.required]],
    cantidad: ['', [Validators.required, Validators.min(1)]],
    precio_unitario: ['', [Validators.required, Validators.min(0)]],
    total: ['', [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    this.productoService.loadProductos();
    this.ventaService.loadVentas();
  }

  constructor() {
    effect(() => {
      const detalle = this.detalleService.detalleEditando();
      if (detalle) {
        this.formDetalle.patchValue(detalle);
      }
    });
    
    // Auto-calculate total if cantidad or precio_unitario changes
    this.formDetalle.get('cantidad')?.valueChanges.subscribe(this.calcularTotal.bind(this));
    this.formDetalle.get('precio_unitario')?.valueChanges.subscribe(this.calcularTotal.bind(this));
  }

  calcularTotal() {
    const cantidad = this.formDetalle.get('cantidad')?.value || 0;
    const precio = this.formDetalle.get('precio_unitario')?.value || 0;
    this.formDetalle.patchValue({ total: cantidad * precio }, { emitEvent: false });
  }

  guardarDetalle() {
  if (this.formDetalle.invalid) return;

  const detalle = {
    productoId: this.formDetalle.value.id_producto,
    ventaId: this.formDetalle.value.id_venta,
    cantidad: Number(this.formDetalle.value.cantidad),
    precio_unitario: Number(this.formDetalle.value.precio_unitario)
  };

  console.log("DETALLE ENVIADO:", detalle);

  const detalleEdit = this.detalleService.detalleEditando();

  if (detalleEdit) {
    this.detalleService.updateDetalle(detalleEdit.id, detalle);
    this.cancelar();
  } else {
    this.detalleService.postDetalle(detalle);
  }

  this.formDetalle.reset();
}
  cancelar() {
    this.detalleService.cancelarEdicion();
    this.formDetalle.reset();
  }
}
