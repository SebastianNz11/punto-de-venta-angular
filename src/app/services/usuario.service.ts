import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { CreateUsuarioDto } from '../interfaces/crear-usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private urlUsuarios = 'https://punto-venta-backend-hphi.onrender.com/usuario';
  private http = inject(HttpClient);

  usuarios = signal<Usuario[]>([]);
  usuarioEditando = signal<Usuario | null>(null);

  private normalizeUsuario(u: Usuario): Usuario {
    return { ...u, id_usuario: u.id_usuario ?? u.id ?? '' };
  }

  loadUsuarios() {
    this.http.get<Usuario[]>(this.urlUsuarios).subscribe({
      next: (data) => this.usuarios.set(data.map(u => this.normalizeUsuario(u))),
      error: (err) => console.error(err)
    });
  }

  postUsuario(usuario: CreateUsuarioDto) {
    this.http.post<Usuario>(this.urlUsuarios, usuario).subscribe((nuevo) => {
      this.usuarios.update(usuarios => [
        ...usuarios,
        this.normalizeUsuario(nuevo)
      ]);
      alert('Usuario creado');
    });
  }

  deleteUsuario(id: string) {
    this.http.delete<void>(`${this.urlUsuarios}/${id}`).subscribe({
      next: () => {
        this.usuarios.update(usuarios =>
          usuarios.filter(u => u.id_usuario !== id)
        );
      },
      error: (err) => console.error(err)
    });
    alert('Usuario eliminado');
  }

  updateUsuario(id: string, usuario: CreateUsuarioDto) {
    this.http.put<Usuario>(`${this.urlUsuarios}/${id}`, usuario).subscribe(actualizado => {
      this.usuarios.update(usuarios =>
        usuarios.map(u => u.id_usuario === id ? this.normalizeUsuario(actualizado) : u)
      );
      alert('Usuario actualizado');
    });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioEditando.set(usuario);
  }

  cancelarEdicion() {
    this.usuarioEditando.set(null);
  }

}
