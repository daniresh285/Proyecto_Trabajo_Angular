import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar directivas comunes como *ngIf y *ngFor
import { DataService } from '../services/data.service';

// Decorador que define el componente Angular
@Component({
  standalone: true,           
  selector: 'pagina2',          // Selector para usar el componente en HTML como <pagina2>
  styleUrls: ["./pagina2.component.css"],
  imports: [CommonModule],      // Importamos CommonModule para las directivas en la plantilla
  template: `                    <!-- Plantilla HTML inline que define la vista del componente -->
    <h2>Esta es la Página 2</h2>
    <p>Origen: {{ origen || 'Desconocido' }}</p>    <!-- Muestra el origen o "Desconocido" si es null -->
    <p>Usuario: {{ usuario || 'Invitado' }}</p>    <!-- Muestra el usuario o "Invitado" si es null -->

    <button (click)="cargarPokemons()">Mostrar detalles</button> 

    <!-- Contenedor que se muestra solo si mostrarDetalles es true y hay pokemons en la lista -->
    <ul>
      <li *ngFor="let p of pokemon">
        <!-- Botón con el nombre que abre el modal -->
        <button class="nombre-pokemon" (click)="abrirModal(p)">
          {{ p.name }}
        </button>

        <p>Habilidades:</p>
        <ul>
          <li *ngFor="let hab of p.abilities">{{ hab.ability.name }}</li>
        </ul>
      </li>
    </ul>

    <!-- Esto dice que si modalAbierto es = true, el div se deja ver -->
    <div class="modal" *ngIf="modalAbierto">

      <!-- El contenido de este se muestra solo si hay algun pokemon seleccionado -->
      <div class="modal-contenido" *ngIf="pokemonSeleccionado">
        <button class="cerrar" (click)="cerrarModal()">×</button>
        
        <!-- Nombre del pokemon, con el primer carácter en mayúscula gracias al titlecase -->
        <h2>{{ pokemonSeleccionado.name | titlecase }}</h2>

        <!-- Imagen visual del pokemon -->
        <img [src]="pokemonSeleccionado.sprites.front_default" alt="Imagen Pokémon"> 

        <!-- Información básica del pokémon -->
        <p><strong>ID:</strong> {{ pokemonSeleccionado.id }}</p>
        <p><strong>Altura:</strong> {{ pokemonSeleccionado.height }} cm</p>
        <p><strong>Peso:</strong> {{ pokemonSeleccionado.weight }} kg</p>

        <!-- De que tipo es el pokemon seleccionado que para el bucle lo que hace es recorrer la lista types -->
        <p><strong>Tipos:</strong></p>
        <ul>
          <li *ngFor="let tipo of pokemonSeleccionado.types">
            {{ tipo.type.name }}
          </li>
        </ul>

        <!-- Habilidades del pokémon, itera sobre la lista abilities -->
        <p><strong>Habilidades:</strong></p>
        <ul>
          <li *ngFor="let habilidad of pokemonSeleccionado.abilities">
            {{ habilidad.ability.name }}
          </li>
        </ul>

        <!-- Estadísticas del pokemon se recorre la lista stats -->
        <p><strong>Estadísticas:</strong></p>
        <ul>
          <li *ngFor="let stat of pokemonSeleccionado.stats">
            {{ stat.stat.name }}: {{ stat.base_stat }}
          </li>
        </ul>

        <!-- Primeros 5 movimientos del pokémon, se recorre mediante un slice la lista de moves -->
        <p><strong>Movimientos (primeros 5):</strong></p>
        <ul>
          <li *ngFor="let move of pokemonSeleccionado.moves.slice(0, 5)">
            {{ move.move.name }}
          </li>
        </ul>
      </div>
    </div>
  `,
})

export class Pagina2Component implements OnInit {
  origen: string | null = null;    // Variable para guardar el origen (puede ser string o null)
  usuario: string | null = null;   // Variable para guardar el usuario (puede ser string o null)

  pokemon: any[] = [];             // Array que contendrá los datos de Pokémon (tipo any)
  mostrarDetalles = false;         // Booleano para controlar la visualización de detalles de los pokemons

  modalAbierto: boolean = false;      // Controla si el modal está visible
  pokemonSeleccionado: any = null;    // Guarda el Pokémon que se ha seleccionado


  // Constructor con inyección de dependencias para rutas y título
  constructor(
    private route: ActivatedRoute,   // Para leer parámetros de la URL
    private titleService: Title,      // Para cambiar el título de la pestaña
    private dataService: DataService
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const origen = localStorage.getItem('vengoDe');  // Leemos un dato guardado en localStorage
    console.log('Origen guardado en localStorage:', origen); // Mostramos en consola para debugging

    this.titleService.setTitle('Pagina2');  // Cambiamos el título del navegador a "Pagina2"

    // Intentamos obtener 'origen' desde los parámetros de la URL,
    // si no está, lo cogemos desde localStorage
    this.origen = this.route.snapshot.queryParamMap.get('origen') || localStorage.getItem('vengoDe');

    // Obtenemos 'usuario' desde los parámetros de la URL (puede ser null)
    this.usuario = this.route.snapshot.queryParamMap.get('usuario');

    // 🔁 Al salir o recargar la página, borrar los datos
    window.addEventListener('beforeunload', () => {
      localStorage.clear();
    });
  }

  // Método para cargar los datos de pokémon desde localStorage al pulsar el botón
  cargarPokemons() {
    const dataGuardada = localStorage.getItem('pokemons'); // Leemos la cadena JSON guardada

    if (dataGuardada) {                        // Si hay datos guardados...
      this.pokemon = JSON.parse(dataGuardada); // Convertimos el JSON a objeto/array
      this.mostrarDetalles = true;             // Activamos la visualización del bloque de detalles para que podamos ver el nombre y las habilidades
      console.log("Pokémon cargados desde localStorage:", this.pokemon); // Debugging en consola para saber que se han cargado bien
    } else {
      console.warn("No hay datos de Pokémon en localStorage."); // Aviso si no hay datos
    }
  }

  abrirModal(pokemon: any) {
    this.pokemonSeleccionado = pokemon; // Guarda el objeto completo
    this.modalAbierto = true; //  Abre el modal
    document.body.style.overflow= "hidden"; // Desactiva el scroll de fondo
  }

  cerrarModal() {
    this.pokemonSeleccionado = null;   // Limpia los datos del pokemon
    this.modalAbierto = false;   // Oculta el modal de la vista
    document.body.style.overflow= ''; // Vuelve a activar el modal 
  }

}
