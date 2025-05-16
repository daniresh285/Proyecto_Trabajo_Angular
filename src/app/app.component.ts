import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet],

})

export class AppComponent {

  
  // Cada vez que la URL tenga un parámetro llamado vengoDe
  // Este código lo imprime en la consola. 
  // Sirve para saber desde qué página o lugar llegó el usuario.
  constructor(private route: ActivatedRoute) {
    const origen = localStorage.getItem('vengoDe');
    console.log('Vino desde la URL del proyecto 2:', window.location.href); 

  }
  volverAlProyecto1() {
    // Esto lo que hace es que hace conexión a la anterior página y con el self lo que hace es quedarse con la página suya en vez de crear una nueva
    localStorage.setItem('VengoDe', 'proyecto 1');
    window.location.href = 'http://localhost:4200/';
  }
}
