import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common'; // Esto es necesario para activar el if y el for



@Component({
  standalone: true, //Esto es obligatorio dado nuestra version de angular
  selector: 'app-pagina1',
  // Esto es como una plantilla de html para poder poner todo lo que quieras que salga en la página
  templateUrl: "./pagina1.Component.html",
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
  }

  abrirEnNuevaPestana() {
    localStorage.setItem('vengoDe', 'pagina1'); // Guarda el valor de pagina 1 en localStorage del navegador con la clave "VengoDe"
    this.router.navigate(['/pagina2'], { // Navega a la ruta /pagina2 tal como se pide
      queryParams: { // le añado paramatros de consulta que va a salir en la siguiente página a la hora de navegar a la pagina 2
        origen: 'pagina1',
        usuario: 'admin' }
    });
  }

  // Con el subscribe lo que hacemos una subscripcion a la respuesta asincrona
  // Si da exito se guarda en data todo el contenido de la api
  cargarPokemons() {
    this.dataService.getPokemon().subscribe(data => {
      this.pokemon = data;
      // Guardamos los datos en localStorage para usarlos en Página 2
      localStorage.setItem('pokemons', JSON.stringify(data)); // Lo guardamos como un string 
      console.log('Pokémon aleatorios cargados y guardados en localStorage:', data); // Avisamos de que los datos se han guardado correctamente
    });
  }
}