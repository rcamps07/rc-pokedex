import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param limit - the number of pokemon to pull from PokeApi. 
   * @param offset - the amount of pokemon to skip according to their assigned IDs from PokeApi.
   * @returns - a JSON list of pokemon according to the parameters set. 
   */
  getPokemon(limit: number, offset: number){
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  /**
   * 
   * @param name - the name of the pokemon to retrieve
   * @returns - a JSON list of pokemon attributes
   */
  getPokemonData(name: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
