import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar directivas comunes como *ngIf y *ngFor
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

// Decorador que define el componente Angular
@Component({
<<<<<<< HEAD
  standalone: true,
=======
  standalone: true,           
>>>>>>> 2d993bf5f3e9909cdcdc8c01661309178898a9b8
  selector: 'pagina2',  // Selector para usar el componente en HTML como <pagina2>
  styleUrls: ["./pagina2.component.css"],
  imports: [CommonModule, FormsModule, RouterModule],  // Importamos CommonModule para las directivas en la plantilla
  templateUrl: "./pagina2.component.html" // importamos directamente el html donde tenemos todo el contenido
})

export class Pagina2Component implements OnInit {
  origen: string | null = null;    // Variable para guardar el origen (puede ser string o null)
  usuario: string | null = null;   // Variable para guardar el usuario (puede ser string o null)

  pokemon: any[] = [];   // Array que contendrá los datos de Pokémon (tipo any)
  mostrarDetalles = false;   // Booleano para controlar la visualización de detalles de los pokemons
  todos: any[] =[]; // Array que contendrá todos los pokémons

  // Variables para el modal
  modalAbierto: boolean = false; // Controla si el modal está visible
  pokemonSeleccionado: any = null; // Guarda el Pokémon que se ha seleccionado
  paginaInput: number = 1;  // ← Se inicializa con la misma página actual

  // Variables para la paginación
  paginaActual: number = 1; // Página actual
  pokemonsPorPagina: number = 10; // Numero de pokemons por pagina
  totalPokemons: number = 0; // Total de pokémons
  totalPaginas: number = 0; // Total de páginas
  siguienteURL: string | null = null; // URL de la siguiente pagina que puede ser tanto string como valor null
  anteriorURL: string | null = null; // URL de la pagina anterior que puede ser tanto string como valor null

  //Variables de busqueda
  terminoBusqueda: string = ''; // Termino de búsqueda inicializado como cadena vacía
  pokemonFiltrado: any[] = []; // Array para guardar los pokémons filtrados que es un array vacio
  buscando: boolean = false; // Para saber si estamos en modo búsqueda o no

  // Constructor con inyección de dependencias para rutas y título
  constructor(
    private route: ActivatedRoute,   // Para leer parámetros de la URL
    private titleService: Title,      // Para cambiar el título de la pestaña
    private dataService: DataService // Servicio para obtener datos de Pokémon
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const origen = localStorage.getItem('vengoDe');  // Leemos un dato guardado en localStorage
    console.log('Origen guardado en localStorage:', origen); // Mostramos en consola para debugging

    this.titleService.setTitle('Pagina2');  // Cambiamos el título del navegador a "Pagina2"

    // Cargamos los pokémons al iniciar la página
    this.cargarTodosLosPokemons();

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

  // Esto lo que hace es ir cargando los pokemons de la siguiente pagina
  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.paginaInput = this.paginaActual;
      this.cargarPokemons((this.paginaActual - 1) * this.pokemonsPorPagina);
    }
  }
  // Esto lo que hace es ir cargando los pokemons de la pagina anterior
  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.paginaInput = this.paginaActual;
      this.cargarPokemons((this.paginaActual - 1) * this.pokemonsPorPagina);
    }
  }

<<<<<<< HEAD
  // Método para ir a una página específica
=======
  // Método para ir a una página específica 
>>>>>>> 2d993bf5f3e9909cdcdc8c01661309178898a9b8
  irAPagina(numero: number): void {
  if (numero >= 1 && numero <= this.totalPaginas) {
    this.paginaActual = numero;
    this.paginaInput = numero;
    const offset = (numero - 1) * this.pokemonsPorPagina;
    this.cargarPokemons(offset);
  }
}
<<<<<<< HEAD

=======
  
>>>>>>> 2d993bf5f3e9909cdcdc8c01661309178898a9b8
  // Método para cargar los datos de pokémon desde localStorage al pulsar el botón
  cargarPokemons(offset: number = 0) {
    const pagina = Math.floor(offset / this.pokemonsPorPagina) + 1;

    // Llamada al servicio para obtener los pokémons
    this.dataService.getPokemons(pagina, this.pokemonsPorPagina).subscribe(data => {
      this.pokemon = data.results; //Obtenemos los resultados de la llamada y lo guardamos en la variable pokemon
      this.totalPokemons = data.count; // Guardamos el total de pokemons que nos devuelve la API
      this.totalPaginas = Math.ceil(this.totalPokemons / this.pokemonsPorPagina); // Calculamos el total de páginas
      this.siguienteURL = data.next; // Guardamos la URL de la siguiente página
      this.anteriorURL = data.previous; // Guardamos la URL de la pagina anterior
      this.mostrarDetalles = true;  // Hacemos un booleano para mostrar los detalles de los pokemons
    });
  }

  // Método para cargar todos los pokémons al iniciar la página
  abrirModal(pokemon: any) {
    this.dataService.getPokemonDetalles(pokemon.name).subscribe(detallesCompletos => {
      this.pokemonSeleccionado = detallesCompletos;  // Guarda datos completos del Pokémon
      this.modalAbierto = true;  // Abre el modal
      document.body.style.overflow = "hidden";  // Desactiva scroll fondo
    });
  }

  cerrarModal() {
    this.pokemonSeleccionado = null;   // Limpia los datos del pokemon
    this.modalAbierto = false;   // Oculta el modal de la vista
<<<<<<< HEAD
    document.body.style.overflow= ''; // Vuelve a activar el modal
=======
    document.body.style.overflow= ''; // Vuelve a activar el modal 
>>>>>>> 2d993bf5f3e9909cdcdc8c01661309178898a9b8
  }

  // Método para buscar pokémons por nombre, y filtrar los resultados
  cargarTodosLosPokemons() {
    this.dataService.getAllPokemons().subscribe(data => {
      this.todos = data.results;
    });
  }

  buscarPokemon() {
    const termino = this.terminoBusqueda.trim().toLowerCase();

    if (termino.length === 0) {
      this.buscando = false;
      this.pokemonFiltrado = [];
      this.cargarPokemons((this.paginaActual - 1) * this.pokemonsPorPagina);
    } else {
      this.buscando = true;
      this.pokemonFiltrado = this.todos.filter(p => p.name.toLowerCase().startsWith(termino));
    }
  }



}
