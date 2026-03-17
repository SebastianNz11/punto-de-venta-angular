import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios-form.html',
  styleUrl: './usuarios-form.css',
})
export class UsuariosForm {
  usuarioService = inject(UsuarioService);
  fb = inject(FormBuilder);

  formUsuario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const usuario = this.usuarioService.usuarioEditando();
      if (usuario) {
        this.formUsuario.patchValue(usuario);
      }
    });
  }

  guardarUsuario() {
    if (this.formUsuario.invalid) return;
    const usuario = this.formUsuario.getRawValue();
    const usuarioEdit = this.usuarioService.usuarioEditando();
    if (usuarioEdit) {
      this.usuarioService.updateUsuario(usuarioEdit.id_usuario, usuario);
      this.cancelar();
    } else {
      this.usuarioService.postUsuario(usuario);
    }
    this.formUsuario.reset();
  }

  cancelar() {
    this.usuarioService.cancelarEdicion();
    this.formUsuario.reset();
  }
}
