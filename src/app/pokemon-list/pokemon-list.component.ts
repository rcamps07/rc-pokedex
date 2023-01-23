import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, DoCheck, AfterContentInit {
    fetchedPokemon: any[] = [];
    pokemonList: Pokemon[] = [];

    constructor(
      private dataService: DataService
    ){}

    ngOnInit(): void {
      this.getPokemon();
    }

    ngDoCheck(): void {
      console.log("doCheck()");
    }

    ngAfterContentInit(): void {
      console.log("afterContentInit()");
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
          //The results are added to the 'fetchedPokemon' array
          .subscribe((specificPokemon: any) => {
            this.fetchedPokemon.push(specificPokemon);
            this.pokemonList.push(new Pokemon(specificPokemon.id, 
                                  specificPokemon.name, specificPokemon.height, 
                                  specificPokemon.weight, specificPokemon.sprites.front_default))
          })
        })
      })
    }

    convertApiToPokemon() {
      for(let i = 0; i < this.fetchedPokemon.length; i++) {
        this.pokemonList.push(new Pokemon(
          this.fetchedPokemon[i].id,
          this.fetchedPokemon[i].name,
          this.fetchedPokemon[i].height,
          this.fetchedPokemon[i].weight,
          this.fetchedPokemon[i].sprites.front_default))
      }
      console.log(this.pokemonList);     
    }

    displayData(){
      console.log(this.pokemonList);
    }

}
