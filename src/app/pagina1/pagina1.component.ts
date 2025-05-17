import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common'; // Esto es necesario para activar el if y el for 



@Component({
  standalone: true, //Esto es obligatorio dado nuestra version de angular
  selector: 'app-pagina1',
  // Esto es como una plantilla de html para poder poner todo lo que quieras que salga en la página
  template: `
    <h1>Esta es la página 1</h1>

    <p>Vamos a crear el boton para pasar a la página 2</p>

    <button (click)="abrirEnNuevaPestana()">Ir a Página 2</button>
    <br><br>
    <button (click)="cargarPokemons()">Cargar Pokemons</button>

    
    <div *ngIf="pokemon?.length"> <!-- Muestra el contenido de la array si tiene elemntos o si el lenght es mayor de 0 -->
      <h3>Pokemons cargados:</h3> <!-- Este titulo aparece solo si el div es visible, osea si hay datos -->
      <ul>
        <li *ngFor="let p of pokemon">{{ p.name }}</li> <!-- Va iterar sobre cada elemento de la array, cada pokemon es llamado aqui por p y despues hacemos una interpolacion para coja los nombres de los pokemons y eso lo agrupa en una lista -->
      </ul>
    </div>
  `,
  imports: [RouterModule, CommonModule] //El common module hay que ponerlo tanto aqui como arriba para que funcione
})
export class Pagina1Component implements OnInit {

  // La variable donde vamos a guardar los datos que va a ser un array que puede entrar cualquier tipo de dato y se incializará en una array vacía 
  pokemon: any[] = [];

  // El constructor se utiliza para inyectar dependencias que tenemos creadas arriba, si pones private estas se guardan como propiedades que puedes utilizar mas adentante
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const origen = localStorage.getItem('vengoDe'); // Con esto recuperas los datos que hemos enviado antes con el set
    console.log('Vino desde la URL del proyecto 1:', window.location.href); // Esto es para que señalize desde que URL viene
    console.log('Origen guardado en localStorage:', origen); // Y esto es para saber lo que se puede guardar en el localStorage

    this.route.queryParams.subscribe(params => {
      console.log('QueryParams:', params)});

    // Hacemos llamada a la api que tiene un observable que representa la llamada a la api
    // Con el subscribe lo que hacemos una subscripcion a la respuesta asincrona
    // Si da exito se guarda en data todo el contenido de la api y despues extraemos el contenido de data y lo guardamos en la variable pokemon que tenemos en este componente
    
  }

  abrirEnNuevaPestana() {
    localStorage.setItem('vengoDe', 'pagina1'); // Guarda el valor de pagina 1 en localStorage del navegador con la clave "VengoDe"
    this.router.navigate(['/pagina2'], { // Navega a la ruta /pagina2
      queryParams: { // le añado paramatros de consulta que va a salir en la barra de busqueda
        origen: 'pagina1', 
        usuario: 'admin' }
    });
  }

  // Con el subscribe lo que hacemos una subscripcion a la respuesta asincrona
  // Si da exito se guarda en data todo el contenido de la api
  cargarPokemons() {
  this.dataService.getRandomPokemons().subscribe(data => {
    console.log('Pokémon aleatorios con detalles:', data);
  });
}
}
