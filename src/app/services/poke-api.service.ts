import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  url:string = "https://pokeapi.co/api/v2/pokemon/";



  constructor(
    private http:HttpClient
  ) { }


  getPokemons(offset:number):Observable<any> {
    return this.http.get<Pokemon[]>(this.url + '?offset=' + offset + '&limit=12')
  }
  
  getPokemon(name:string):Observable<any> {
    return this.http.get<Pokemon>(this.url + name)
  }


}
