import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.html',
  styleUrl: './usuarios-table.css',
})
export class UsuariosTable implements OnInit {

  usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.usuarioService.loadUsuarios();
  }

  deleteUsuario(id: string) {
    this.usuarioService.deleteUsuario(id);
  }

}
