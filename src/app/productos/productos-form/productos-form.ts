import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos-form',
  imports: [ReactiveFormsModule],
  templateUrl: './productos-form.html',
  styleUrl: './productos-form.css',
})
export class ProductosForm {
  productoService = inject(ProductoService);
  fb = inject(FormBuilder);

  formProducto: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    fecha_ingreso: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const producto = this.productoService.productoEditando();
      if (producto) {
        // Formatear la fecha a YYYY-MM-DD si es necesario para el input type="date"
        const formattedDate = new Date(producto.fecha_ingreso).toISOString().split('T')[0];
        this.formProducto.patchValue({
          ...producto,
          fecha_ingreso: formattedDate
        });
      }
    });
  }

  guardarProducto() {
    if (this.formProducto.invalid) return;
    const producto = this.formProducto.getRawValue();
    const productoEdit = this.productoService.productoEditando();
    if (productoEdit) {
      this.productoService.updateProducto(productoEdit.id, producto);
      this.cancelar();
    } else {
      this.productoService.postProducto(producto);
    }
    this.formProducto.reset();
  }

  cancelar() {
    this.productoService.cancelarEdicion();
    this.formProducto.reset();
  }
}
