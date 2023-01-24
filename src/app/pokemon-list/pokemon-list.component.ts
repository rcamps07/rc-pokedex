import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
    pokemonList: Pokemon[] = [];

    p : any;

    constructor(
      private dataService: DataService
    ){}

    ngOnInit(): void {
      this.getPokemon();
    }

    getPokemon() {
      this.dataService.getPokemon(151,0)
      //response returns an Observable object with 4 attributes: count, next, previous, and results
      .subscribe((response: any) => {

        //Each result comes with a 'name' and 'url attribute.
        //We can use 'name' with the data service getPokemonData to pull each pokemon's specific attributes
        response.results.forEach((result: {name: string; }) => {
          this.dataService.getPokemonData(result.name)

          //response returns an Observable specific pokemon with many attributes
          //from here we can use these attributes to display pokemon data. 
          //The results are added to the 'pokemonList' array
          .subscribe((specificPokemon: any) => {
            this.pokemonList.push(new Pokemon(specificPokemon.id, 
                                  specificPokemon.name, specificPokemon.height, 
                                  specificPokemon.weight, specificPokemon.sprites.front_default))
          })
        })
      })
    }

}
