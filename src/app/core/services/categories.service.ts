import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(pageSize: number, pageIndex: number): Observable<any> {
    const params = new HttpParams()
      .set('PageSize', pageSize.toString())
      .set('PageIndex', pageIndex.toString());
    return this.http.get<any>(environment.category, { params });
  }

  getLookup(): Observable<any> {
    return this.http.get<any>(environment.category);
  }

  add(request: any): Observable<any> {
    return this.http.post<any>(environment.category, request);
  }

  edit(request: any): Observable<any> {
    return this.http.put<any>(environment.category, request);
  }

  getById(id: number) {
    return this.http.get<any>(`${environment.category}/${id}`);
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.category}/${id}`);
  }

  //   filterCountry(request: any): Observable<any> {
  //     return this.http.post<any>(
  //       `${environment.cart}/GetList/ByDynamic`,
  //       request
  //     );
  //   }
}
