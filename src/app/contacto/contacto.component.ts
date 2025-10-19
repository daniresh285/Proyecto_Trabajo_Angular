import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // Importamos Location para poder navegar hacia atrás

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  nombre = '';
  email = '';
  mensaje = '';
  mensajeEnviado = false;
<<<<<<< HEAD

=======
  
>>>>>>> 2d993bf5f3e9909cdcdc8c01661309178898a9b8
  constructor(
    private location: Location // Inyectamos Location para poder navegar hacia atrás
  ) {}

  enviarFormulario() {
    // Aquí podrías enviar a un backend o servicio de correo
    console.log('Formulario enviado:', this.nombre, this.email, this.mensaje);
    this.mensajeEnviado = true;

    // Reset opcional
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
  }

  volverAtras() {
    this.location.back();
  }
}
