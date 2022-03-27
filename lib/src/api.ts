import axios from 'axios';
import { Note } from './note';

export class ThrowAwayClient {
  private baseUrl: string;

  constructor(baseUrl = 'http://localhost:5000/api/v1/') {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param note
   * @returns
   */
  async createNote(id: string, note: Note): Promise<void> {
    return axios.put(this.baseUrl + `/note/${id}`, note);
  }

  /**
   *
   * @param id
   * @returns encrypted note
   */
  async fetchNote(id: string): Promise<Note> {
    const result = await axios.get(this.baseUrl + `/note/${id}`);
    return result.data;
  }
}
