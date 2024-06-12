
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Photographer } from '../model/photographer.model';
@Injectable({
  providedIn: 'root'
})
export class PhotographerService {
  private apiUrl: string = 'https://inphototest.app2u.es/api/photographer/';
  private username: string = 'test@gmail.com';
  private password: string = '1234';

  constructor(private http: HttpClient, private dbService: NgxIndexedDBService) {}

  getPhotographerData(): Observable<Photographer[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
      'Accept': 'application/json'
    });

    return this.http.get<Photographer[]>(this.apiUrl, { headers }).pipe(
      tap(photographers => {
        photographers.forEach((photographer: Photographer) => {
          this.dbService.add('photographers', photographer).subscribe();
        });
      })
    );
  }

  getStoredPhotographers(): Observable<Photographer[]> {
    return this.dbService.getAll<Photographer>('photographers');
  }

  getPhotographerDetail(id: string): Observable<Photographer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
      'Accept': 'application/json'
    });

    return this.dbService.getByKey<Photographer>('photographers', id).pipe(
      switchMap((photographer: Photographer | undefined) => {
        if (photographer) {
          return of(photographer);
        } else {
          return this.http.get<Photographer>(this.apiUrl + id, { headers }).pipe(
            tap((newPhotographer: Photographer) => {
              this.dbService.add('photographers', newPhotographer).subscribe();
            })
          );
        }
      })
    );
  }
}