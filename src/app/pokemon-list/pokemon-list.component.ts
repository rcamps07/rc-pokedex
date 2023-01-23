import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
    fetchedPokemon: any[] = [];
    fetchedPokemonDescription: any[] = [];

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
          //The results are added to the 'fetchedPokemon' array
          .subscribe((specificPokemon: any) => {
            this.fetchedPokemon.push(specificPokemon);
          })

          //We can use 'name' with the data service getPokemonDataDescription to pull each pokemon's pokedex description
          this.dataService.getPokemonDescription(result.name)

           //response returns an Observable specific pokemon with many attributes
          //from here we can use these attributes to display pokemon data. 
          //The results are added to the 'fetchedPokemon' array
          .subscribe((specificPokemon: any) => {
            this.fetchedPokemonDescription.push(specificPokemon.flavor_text_entries[0].flavor_text);
          })
        })
      })
    }
}
