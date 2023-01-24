import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../pokemon';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
    pokemonList: Pokemon[] = [];

    constructor(
      private dataService: DataService
    ){}

    ngOnInit(): void {
      this.getPokemon();
    }

    getPokemon() {
      this.dataService.getPokemon(10,0)
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

    displayData(){
      console.log(this.pokemonList);
    }

    displayDescriptions(){
      for(let i = 0; i < this.pokemonList.length; i++){
        let pokemonName = this.pokemonList[i].name;
        this.dataService.getPokemonDescription(pokemonName)
        .subscribe((result: any) => {
          this.pokemonList[i].description = result.flavor_text_entries[0].flavor_text;
        })
      }
      console.log(this.pokemonList);      
    }

}
