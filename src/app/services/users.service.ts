import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  private baseUrl: string = "https://peticiones.online/api/users/";

  constructor() { }

  getAll(page: number): Promise<any> {

    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}`));

  }

  getAllUser(): Observable<User[]> {

    return this.httpClient.get<User[]>(this.baseUrl);

  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}${id}`)

  }

  getByIdPromise(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}${id}`));
  }


  delete(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`));

  }

  insert(formValue: User): Promise<User>{
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, formValue));
  }

  update(formValue: User): Promise<User>{
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${formValue._id}`, formValue));
  }

}
