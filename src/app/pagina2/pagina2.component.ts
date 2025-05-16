import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'pagina2',
  template: `
    <h2>Esta es la Página 2</h2>
    <p>Origen: {{ origen || 'Desconocido' }}</p>
    <p>Usuario: {{ usuario || 'Invitado' }}</p>
  `
})
export class Pagina2Component implements OnInit {
  origen: string | null = null;
  usuario: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Accedemos a los parámetros de la URL
    this.origen = this.route.snapshot.queryParamMap.get('origen') || localStorage.getItem('VengoDe');
    this.usuario = this.route.snapshot.queryParamMap.get('usuario');
  }
}

