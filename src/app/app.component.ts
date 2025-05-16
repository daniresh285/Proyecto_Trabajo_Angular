import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.Component.html',
  imports: [RouterOutlet, RouterModule]
})
export class AppComponent {

  constructor(private route: ActivatedRoute) {
    const origen = localStorage.getItem('vEngoDe');
    console.log('Vino desde la URL del proyecto 1:', window.location.href); 
  }

  //Esto lo que hace es conectarse directamente a la URL donde esta el otro proyecto conectado 
  //Ademas el localStorage indica que se me va enviar a la consola del navegador y lo que quiero enviarle es de donde vuelvo
  abrirEnNuevaPestana() {
    localStorage.setItem('vEngoDe', 'proyecto 2');
    window.location.href ='http://localhost:4300';
  }
  
}


