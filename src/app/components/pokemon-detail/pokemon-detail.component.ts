import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemonMoves: any[] = [];
  pokemonStats: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PokemonDetailComponent>,
    private pokemonApi: PokeApiService,
    
    @Inject(MAT_DIALOG_DATA) public data: {pokemon:any},
    
  ) { }

  ngOnInit(): void {

    for (let i = 0; i < 4; i++) {
      this.pokemonMoves.push(this.data.pokemon.moves[i].move.name) 
     
    }


    for (let i = 0; i < 4; i++) {
      this.pokemonStats.push(this.data.pokemon.stats[i]) 
    }

   
  }



  pokemonType(type: string) {
    if (type == 'fire') {
      return 'fire';
    } else if (type == 'grass') {
      return 'grass';
    } else if (type == 'water') {
      return 'water';
    } else if (type == 'bug') {
      return 'bug';
    } else if (type == 'poison') {
      return 'poison';
    } else if (type == 'normal') {
      return 'normal';
    } else if (type == 'ground') {
      return 'ground';
    } else if (type == 'psychic') {
      return 'psychic';
    } else if (type == 'electric') {
      return 'electric';
    }
    else {
      return 'normal'
    }
  }
}
