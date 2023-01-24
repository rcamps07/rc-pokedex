import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';

  /**
   * 
   * @param limit - the number of pokemon to pull from PokeApi. 
   * @param offset - the amount of pokemon to skip according to their assigned IDs from PokeApi.
   * @returns - a JSON list of pokemon according to the parameters set. 
   */
  getPokemon(limit: number, offset: number): Observable<Object>{
    return this.http.get(
      `${this.pokeApiUrl}?limit=${limit}&offset=${offset}`
    );
  }

  /**
   * 
   * @param name - the name of the pokemon to retrieve
   * @returns - a JSON list of pokemon attributes
   */
  getPokemonData(name: string){
    return this.http.get(`${this.pokeApiUrl}/${name}`);
  }

  //to-do
  getPokemonDescription(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  }

  getPokemonDescriptonByID(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }

  getPokemonByID(ID: number) {
    return this.http.get(`${this.pokeApiUrl}/${ID}`);
  }
}
