import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor(private http: HttpClient) {}
  getLangs(): Observable<any> {
    return this.http.get<any>(environment.languages);
  }
}
