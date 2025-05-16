import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pagina1',
  template: `
    <h1>Esta es la página 1</h1>

    <p>Vamos a crear el boton para pasar a la página 2</p>

    <button (click)="abrirEnNuevaPestana()">Ir a Página 2</button>
  `,
  imports: [RouterModule]
})
export class Pagina1Component implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const origen = localStorage.getItem('vengoDe');
    console.log('Vino desde la URL del proyecto 1:', window.location.href);
    console.log('Origen guardado en localStorage:', origen);

    this.route.queryParams.subscribe(params => {
      console.log('QueryParams:', params)});
  }

  abrirEnNuevaPestana() {
    localStorage.setItem('vengoDe', 'pagina1');
    this.router.navigate(['/pagina2'], {
      queryParams: { 
        origen: 'pagina1', 
        usuario: 'admin' }
    });
  }
}
