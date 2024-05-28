import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from './entitites/entitites';

export const httpOptions = {
  headers: new HttpHeaders({}),
  withCredentials: false,
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<User | null> {
    const httpParams: HttpParams = new HttpParams().set('id', id);
    return this.http
      // .get<User | null>(`http://localhost:8080/users?${httpParams}`, httpOptions)
      .get<User | null>(`http://localhost:8080/users/${httpParams}`, httpOptions)
      .pipe(
        map((m) => {
          return m;
        }),
        catchError(() => {
          return of(null);
        })
      );
  }

  public addUser(request: User): Observable<User | null> {
    return this.http.post<User | null>(`http://localhost:8080/users`, request, httpOptions).pipe(
      map(m => {
        return m
      }),
      catchError(() => {
        return of(null);
      })
    )
  }
}
