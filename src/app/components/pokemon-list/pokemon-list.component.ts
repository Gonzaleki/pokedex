import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { Pokemon } from 'src/app/model/pokemon';
import { MatDialog } from '@angular/material/dialog';
import { Pokemons } from 'src/app/model/pokemons';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemones: Pokemon[] = [];
  pokemons: any[] = [];
  pokemonSelected: any;
  pokemonTotal = 0;
  pokemonName: any;
  pokemonId = 1;
  offset: number = 0;
  totalPage: number = 0



  constructor(
    private pokemonApi: PokeApiService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.pokemonApi.getPokemons(this.offset)
      .subscribe(data => {
        this.pokemonTotal = data.count;
        this.totalPage = this.pokemonTotal / 12;




        data.results.forEach((result: { name: string; }): void => {
          this.pokemonApi.getPokemon(result.name).subscribe(response => {
            this.pokemons.push(response);
            this.pokemons = this.pokemons.sort((a, b) => a.id - b.id);

          })
          this.cd.detectChanges();
          this.pokemonSelected = this.pokemons[0]
        });
      })

  }

  openDialog(pokemon: Pokemon): void {
    this.pokemonSelected = pokemon;
    console.log(this.pokemonSelected)
    this.dialog.open(PokemonDetailComponent, {
      width: '300px',
      data: {
        pokemon: this.pokemonSelected
      }
    });
  }



  nextPage() {
    this.offset = this.offset + 10;
    this.pokemonApi.getPokemons(this.offset)
      .subscribe(data => {
        this.pokemonTotal = data.count;
        this.pokemons = [];
        data.results.forEach((result: { name: string; }): void => {
          this.pokemonApi.getPokemon(result.name).subscribe(response => {
            this.pokemons.push(response);
            this.pokemons = this.pokemons.sort((a, b) => a.id - b.id);

          })
          this.cd.detectChanges();

        });
      })
  }

  previousPage() {
    if (this.offset >= 10) {
      this.offset = this.offset - 10;
      this.pokemonApi.getPokemons(this.offset)
        .subscribe(data => {
          this.pokemonTotal = data.count;
          this.pokemons = [];
          data.results.forEach((result: { name: string; }): void => {
            this.pokemonApi.getPokemon(result.name).subscribe(response => {
              this.pokemons.push(response);
              this.pokemons = this.pokemons.sort((a, b) => a.id - b.id);


            })
            this.cd.detectChanges();

          });
        })
    } else {

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
