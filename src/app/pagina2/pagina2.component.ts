import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'pagina2',
  imports: [CommonModule],
  template: `
    <h2>Esta es la Página 2</h2>
    <p>Origen: {{ origen || 'Desconocido' }}</p>
    <p>Usuario: {{ usuario || 'Invitado' }}</p>

    <button (click)="cargarPokemons()">Mostrar detalles</button>

    <div *ngIf="mostrarDetalles && pokemon?.length">
      <h3>Pokémons en esta página:</h3>
      <ul>
        <li *ngFor="let p of pokemon">
          <h4>{{ p.name }}</h4>
          <p>Habilidades:</p>
          <ul>
            <li *ngFor="let hab of p.abilities">{{ hab.ability.name }}</li>
          </ul>
        </li>
      </ul>
    </div>

  `
})
export class Pagina2Component implements OnInit {
  origen: string | null = null;
  usuario: string | null = null;
  pokemon: any[] = [];
  mostrarDetalles = false;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    const origen = localStorage.getItem('vengoDe');
    console.log('Origen guardado en localStorage:', origen);

    this.titleService.setTitle('Pagina2');

    // Accedemos a los parámetros de la URL, y recogemos los datos correspondientes
    this.origen = this.route.snapshot.queryParamMap.get('origen') || localStorage.getItem('vengoDe');
    this.usuario = this.route.snapshot.queryParamMap.get('usuario');
  }

  cargarPokemons() {
    const dataGuardada = localStorage.getItem('pokemons');

    if (dataGuardada) {
      this.pokemon = JSON.parse(dataGuardada);
      this.mostrarDetalles = true;
      console.log("Pokémon cargados desde localStorage:", this.pokemon);
    } else {
      console.warn("No hay datos de Pokémon en localStorage.");
    }
  }
}
