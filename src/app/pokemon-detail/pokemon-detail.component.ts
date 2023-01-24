import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../pokemon';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit{
  constructor(private location: Location,
              private route: ActivatedRoute,
              private dataService: DataService) {}

  ngOnInit(): void {
      this.getPokemon();
      this.getDescription();
  }

  @Input() pokemon: Pokemon = {
    id: 0,
    name: '',
    height: 0,
    weight: 0,
    urlImage: '',
    description: ''
  };

  getPokemon(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getPokemonByID(id)
      .subscribe((response: any) => {
        this.pokemon.id = response.id;
        this.pokemon.name = response.name;
        this.pokemon.height = response.height;
        this.pokemon.weight = response.weight;
        this.pokemon.urlImage = response.sprites.front_default;
        console.log(this.pokemon);
      });
  }

  getDescription(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getPokemonDescriptonByID(id)
    .subscribe((result: any) => {
      this.pokemon.description = result.flavor_text_entries[0].flavor_text;
    })
    console.log(this.pokemon.description);
  }

}
