import { Character } from "../interfaces/character.interface";
import { httpGet } from "../utils";

export class CharacterApi {
  async getCharacterByName(name: string): Promise<Character> {
    const url = `https://anapioficeandfire.com/api/characters?name=${name.replace(" ","%20")}`;
    const character = await httpGet(url);
    return character[0];
  }
  async getCharactersByCulture(culture:string):Promise<Character[]> {
    const url = `https://anapioficeandfire.com/api/characters?culture=${culture}}`;
    const characters = await httpGet(url);
    return characters;
  }
  async getCharacterByUri(uri: string): Promise<Character> {
    return httpGet(uri);
  }
  async getManyCharactersByUri(list: string[]) {
    return Promise.all(list.map((val) => this.getCharacterByUri(val)));
  }
}
