import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Necesario para hacer peticiones HTTP
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'  // Esto hace que el servicio esté disponible en toda la app sin necesidad de importarlo en providers
})

export class DataService {

  // URL de ejemplo, puedes cambiarla, y aqui meto la URL de la api
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1300'; 

  constructor(private http: HttpClient) { }

  // Esta variable es la utilizamos para hacer la llamada que nos devolvera los datos de la URL
  getPokemon(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPokemonDetalles(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemons(pagina: number, limite: number = 10): Observable<any> {
    const offset = (pagina - 1) * limite;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`);
  }

  // Obtener TODOS los pokemons sin paginación (o muchos, según limite máximo)
  getAllPokemons(): Observable<any> {
    // La API de PokeAPI limita a 1118 pokemons aproximadamente, puedes pedirlos todos así:
    return this.http.get<any>(`${this.apiUrl}?offset=0&limit=1300`);
  }
}