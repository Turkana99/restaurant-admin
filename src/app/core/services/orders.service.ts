import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  getAll(pageSize: number, pageIndex: number): Observable<any> {
    const params = new HttpParams()
      .set('PageSize', pageSize.toString())
      .set('PageIndex', pageIndex.toString());
    return this.http.get<any>(environment.order, { params });
  }

  getLookup(): Observable<any> {
    return this.http.get<any>(environment.order);
  }

  add(request: any): Observable<any> {
    return this.http.post<any>(environment.order, request);
  }

  edit(request: any): Observable<any> {
    return this.http.put<any>(environment.order, request);
  }

  getById(id: number) {
    return this.http.get<any>(`${environment.order}/${id}`);
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.order}/${id}`);
  }

  //   filterCountry(request: any): Observable<any> {
  //     return this.http.post<any>(
  //       `${environment.cart}/GetList/ByDynamic`,
  //       request
  //     );
  //   }
}
