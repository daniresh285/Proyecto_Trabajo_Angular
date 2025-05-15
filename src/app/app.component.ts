import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.Component.html',
  imports: [RouterOutlet]
})
export class AppComponent {

  abrirEnNuevaPestana() {
    window.open('http://localhost:4300', '_blank');
}
}


