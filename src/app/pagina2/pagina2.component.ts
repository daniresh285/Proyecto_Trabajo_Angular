// Importamos el decorador Component y la interfaz OnInit para el ciclo de vida del componente
import { Component, OnInit } from '@angular/core';

// Importamos ActivatedRoute para acceder a los parámetros de la URL
import { ActivatedRoute } from '@angular/router';

// Importamos Title para cambiar el título de la pestaña del navegador
import { Title } from '@angular/platform-browser';

// Importamos CommonModule para usar directivas comunes como *ngIf y *ngFor
import { CommonModule } from '@angular/common';

// Decorador que define el componente Angular
@Component({
  standalone: true,            // Este componente es independiente (no necesita estar en un módulo)
  selector: 'pagina2',          // Selector para usar el componente en HTML como <pagina2>
  imports: [CommonModule],      // Importamos CommonModule para las directivas en la plantilla
  template: `                   // Plantilla HTML inline que define la vista del componente
    <h2>Esta es la Página 2</h2>
    <p>Origen: {{ origen || 'Desconocido' }}</p>    <!-- Muestra el origen o "Desconocido" si es null -->
    <p>Usuario: {{ usuario || 'Invitado' }}</p>    <!-- Muestra el usuario o "Invitado" si es null -->

    <button (click)="cargarPokemons()">Mostrar detalles</button>  <!-- Botón que ejecuta cargarPokemons() -->

    <!-- Contenedor que se muestra solo si mostrarDetalles es true y hay pokemons en la lista -->
    <div *ngIf="mostrarDetalles && pokemon?.length">
      <h3>Pokémons en esta página:</h3>
      <ul>
        <!-- Itera sobre cada Pokémon en la lista pokemon -->
        <li *ngFor="let p of pokemon">
          <h4>{{ p.name }}</h4>               <!-- Muestra el nombre del Pokémon -->
          <p>Habilidades:</p>
          <ul>
            <!-- Itera sobre las habilidades del Pokémon -->
            <li *ngFor="let hab of p.abilities">{{ hab.ability.name }}</li> <!-- Muestra cada habilidad -->
          </ul>
        </li>
      </ul>
    </div>

  `
})

// Definición de la clase del componente que implementa OnInit para usar ngOnInit()
export class Pagina2Component implements OnInit {
  origen: string | null = null;    // Variable para guardar el origen (puede ser string o null)
  usuario: string | null = null;   // Variable para guardar el usuario (puede ser string o null)
  pokemon: any[] = [];             // Array que contendrá los datos de Pokémon (tipo any)
  mostrarDetalles = false;         // Boolean para controlar la visualización de detalles

  // Constructor con inyección de dependencias para rutas y título
  constructor(
    private route: ActivatedRoute,   // Para leer parámetros de la URL
    private titleService: Title      // Para cambiar el título de la pestaña
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const origen = localStorage.getItem('vengoDe');  // Leemos un dato guardado en localStorage
    console.log('Origen guardado en localStorage:', origen); // Mostramos en consola para debugging

    this.titleService.setTitle('Pagina2');           // Cambiamos el título del navegador a "Pagina2"

    // Intentamos obtener 'origen' desde los parámetros de la URL,
    // si no está, lo cogemos desde localStorage
    this.origen = this.route.snapshot.queryParamMap.get('origen') || localStorage.getItem('vengoDe');

    // Obtenemos 'usuario' desde los parámetros de la URL (puede ser null)
    this.usuario = this.route.snapshot.queryParamMap.get('usuario');
  }

  // Método para cargar los datos de pokémon desde localStorage al pulsar el botón
  cargarPokemons() {
    const dataGuardada = localStorage.getItem('pokemons'); // Leemos la cadena JSON guardada

    if (dataGuardada) {                        // Si hay datos guardados...
      this.pokemon = JSON.parse(dataGuardada); // Convertimos el JSON a objeto/array y asignamos
      this.mostrarDetalles = true;             // Activamos la visualización del bloque de detalles
      console.log("Pokémon cargados desde localStorage:", this.pokemon); // Debugging en consola
    } else {
      console.warn("No hay datos de Pokémon en localStorage."); // Aviso si no hay datos
    }
  }
}
