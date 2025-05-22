import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Necesario para hacer peticiones HTTP
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'  // Esto hace que el servicio esté disponible en toda la app sin necesidad de importarlo en providers
})

export class DataService {

  // URL de ejemplo, puedes cambiarla, y aqui meto la URL de la api
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10'; 

  constructor(private http: HttpClient) { }

  // Esta variable es la utilizamos para hacer la llamada que nos devolvera los datos de la URL
  getPokemon(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  getRandomPokemons(count: number = 10): Observable<any[]> {
    return new Observable(observer => {
      // Paso 1: obtener lista completa (nombre + URL)
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1302').subscribe(response => {
        const allPokemons = response.results;

        // Paso 2: seleccionar aleatoriamente 'count' pokémon sin repetir
        const selectedPokemons = this.selectRandomElements(allPokemons, count);

        // Paso 3: pedir detalles para esos pokémon con forkJoin
        const requests = selectedPokemons.map(p => this.http.get(p.url));
        forkJoin(requests).subscribe(details => {
          observer.next(details);
          observer.complete();
        });
      });
    });
  }

  // Función auxiliar para seleccionar elementos aleatorios sin repetir
  private selectRandomElements(array: any[], count: number): any[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  getPokemonDetalles(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemons(pagina: number, limite: number = 10): Observable<any> {
    const offset = (pagina - 1) * limite;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`);
  }
}



