import { Book } from "../interfaces/book.interface";
import { httpGet } from "../utils";
import { CharacterApi } from "./character.api";

export class BooksApi {
  private characterApi = new CharacterApi();
  async getAllBoooks(page: number = 1, pageSize = 200): Promise<Book[]> {
    const url = `https://anapioficeandfire.com/api/books?page=${page}&pageSize=${pageSize}`;
    const books = await httpGet(url);
    return books;
  }
  async getBookById(id: number): Promise<Book> {
    const url = `https://anapioficeandfire.com/api/books/${id}`;
    const book = await httpGet(url);
    return book;
  }
  async getBookByName(name: string): Promise<Book> {
    const url = `https://anapioficeandfire.com/api/books?name=${name}`;
    const book = await httpGet(url);
    return book.ur;
  }
  async getBooksByCharacterName(name: string) {
    const character = await this.characterApi.getCharacterByName(name);
    if (!character) {
      return [];
    }
    return this.getManyBooksByUri([
      ...new Set([...character.books, ...character.povBooks]),
    ]);
  }
  async getBooksByCharacterCulture(name: string) {
    const characters = await this.characterApi.getCharactersByCulture(name);
    const res: Book[] = [];
    for (let i = 0; i < characters.length; i++) {
      const books = await this.getBooksByCharacterName(characters[i].name);
      res.push(...books);
    }
    return res;
  }
  async getBooksByAuthor(authors: string, page: number = 1): Promise<Book[]> {
    const books = await this.getAllBoooks(page);
    if (authors === "") {
      return books;
    }
    return books.filter(
      (book) => book.authors.filter((val) => val === authors).length
    );
  }
  async getBooksByISBN(isbn: string, page: number = 1) {
    const books = await this.getAllBoooks(page, 300);
    return books.filter((book) => book.isbn === isbn);
  }
  async getBooksByPublisher(publisher: string, page: number = 1) {
    const books = await this.getAllBoooks(page);
    return books.filter((book) => book.publisher === publisher);
  }
  async getManyBooksByUri(list: string[]) {
    return Promise.all(list.map((val) => this.getBookByUri(val)));
  }
  async getBookByUri(uri: string): Promise<Book> {
    return httpGet(uri);
  }
  async search(text: string) {
    let byname = (await this.getBookByName(text))?.url || "";
    let byisbn =
      (await this.getBooksByISBN(text)).map((book) => book.url) || [];
    let bypublisher =
      (await this.getBooksByPublisher(text)).map((book) => book.url) || [];
    let byCharactername =
      (await this.getBooksByCharacterName(text)).map((book) => book.url) || [];
    let byCharacterCulture =
      (await this.getBooksByCharacterCulture(text)).map((book) => book.url) || [];
    let byAuthor = (await this.getBooksByAuthor(text)).map((book) => book.url);
    return this.getManyBooksByUri([
      ...new Set(
        [
          byname,
          ...byisbn,
          ...byCharacterCulture,
          ...bypublisher,
          ...byCharactername,
          ...byAuthor,
        ].filter((url) => url !== "")
      ),
    ]);
  }
}
