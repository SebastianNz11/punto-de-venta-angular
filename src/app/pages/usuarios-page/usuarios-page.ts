import { Component } from '@angular/core';
import { UsuariosTable } from "../../usuarios/usuarios-table/usuarios-table";
import { UsuariosForm } from "../../usuarios/usuarios-form/usuarios-form";

@Component({
  selector: 'app-usuarios-page',
  imports: [UsuariosTable, UsuariosForm],
  templateUrl: './usuarios-page.html',
  styleUrl: './usuarios-page.css',
})
export default class UsuariosPage {}
