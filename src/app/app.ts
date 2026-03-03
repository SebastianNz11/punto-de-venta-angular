import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientesTable } from "./clientes/clientes-table/clientes-table";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud');
}
