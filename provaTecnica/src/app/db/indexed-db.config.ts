import Dexie, { Table } from 'dexie'
import { Photographer } from '../model/photographer.model'
// Creació de la base de dades IndexedDB amb Dexie
export class PhotographersDB extends Dexie {
  // Taula per emmagatzemar les dades
  photographers!: Table<Photographer, number>
  constructor () {
    super('PhotographersDB')
    // Versió de la base de dades i creació de la taula photographers
    this.version(1).stores({
      photographers: '++id,guid,email,first_name,last_name,is_removed,description,avatar,image,facebook,instagram,webpage'
    })
  }
}
export const db = new PhotographersDB()
