import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../services/data.service';
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
    private titleService: Title, 
    private dataService: DataService
  ) {}

  ngOnInit() {
    const origen = localStorage.getItem('vengoDe');
    console.log('Origen guardado en localStorage:', origen);

    this.titleService.setTitle('Pagina2');

    // Accedemos a los parámetros de la URL, y recogemos los datos correspondientes
    this.origen = this.route.snapshot.queryParamMap.get('origen') || localStorage.getItem('vengoDe');
    this.usuario = this.route.snapshot.queryParamMap.get('usuario');

    this.dataService.getRandomPokemons().subscribe({
      next: details => {
        this.pokemon = details; // Esto lo que hace es basicamente buscarme los resultados que tengo en el template y como lo tengo que me lo ponga en una lista y me busque por el nombre, me tiene que poner en la pagina los nombres en formato lista
        console.log('Detalles recibidos:', this.pokemon);
      },
      error: err => {
        console.error('Error cargando detalles:', err);
      }
    });
  }

  cargarPokemons() {
    this.dataService.getRandomPokemons().subscribe(data => {
      this.pokemon = data;
      this.mostrarDetalles = true;
      console.log("Extraidos correctamente");
    });
  }
}
