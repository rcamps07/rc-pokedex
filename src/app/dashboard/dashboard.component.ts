import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  pokemonList: Pokemon[] = [];

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
      this.getPokemon();
  }

  getPokemon() {
    this.dataService.getPokemon(5, this.getRandomInt(147))
    .subscribe((response: any) => {
      response.results.forEach((result: {name: string;}) => {
        this.dataService.getPokemonData(result.name)
        .subscribe((specificPokemon: any) => {
          this.pokemonList.push(new Pokemon(specificPokemon.id, 
                                specificPokemon.name, specificPokemon.height, 
                                specificPokemon.weight, specificPokemon.sprites.front_default))
        })
      })
    })
  }

  /**
   * 
   * @param max ex: (3) will return 0, 1, or 2
   * @returns return a random int up to the 'max' parameter minus 1
   */
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}
