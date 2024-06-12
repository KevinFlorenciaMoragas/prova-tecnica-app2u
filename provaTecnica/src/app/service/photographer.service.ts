import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, from, of } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import { Photographer } from '../model/photographer.model'
import { db } from '../db/indexed-db.config'
import { PaginatedPhotographer } from '../model/paginatedPhotographer.model'

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {
  private readonly apiUrl: string = 'https://inphototest.app2u.es/api/photographer/'
  private readonly username: string = 'test@gmail.com'
  private readonly password: string = '1234'

  constructor (private readonly http: HttpClient) { }

  fetchPhotographers (): Observable<Photographer[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
      Accept: 'application/json'
    })
    // Retorna les dades de l'API i les guarda a IndexedDB
    return this.http.get<PaginatedPhotographer>(this.apiUrl, { headers }).pipe(
      map((data) => {
        console.log(data)
        data.results.forEach((photographer: Photographer) => {
          db.photographers.put(photographer).catch(error => {
            console.error('Error saving photographer to IndexedDB', error)
          })
        })
        return data.results
      }),
      // Si hi ha un error, retorna les dades guardades a IndexedDB
      catchError((error) => {
        console.error('Error fetching photographers', error)
        return this.getStoredPhotographers()
      }
      ))
  }

  // Retorna les dades guardades a IndexedDB
  getStoredPhotographers (): Observable<Photographer[]> {
    return from(db.photographers.toArray())
  }

  getPhotographerDetail (id: string): Observable<Photographer> {
    return from(db.photographers.get(parseInt(id))).pipe(
      switchMap((photographer: Photographer | undefined) => {
        if (photographer != null) {
          return of(photographer)
        } else {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(this.username + ':' + this.password),
            Accept: 'application/json'
          })
          // Retorna les dades de l'API i les guarda a IndexedDB
          return this.http.get<Photographer>(this.apiUrl + id, { headers }).pipe(
            map((newPhotographer: Photographer) => {
              db.photographers.put(newPhotographer).catch(error => {
                console.error('Error saving photographer to IndexedDB', error)
              })
              return newPhotographer
            })
          )
        }
      })
    )
  }
}
