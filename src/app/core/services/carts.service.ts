import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}
  getCarts(pageSize: number, pageIndex: number): Observable<any> {
    const params = new HttpParams()
      .set('PageSize', pageSize.toString())
      .set('PageIndex', pageIndex.toString());
    return this.http.get<any>(environment.cart, { params });
  }

  addCart(request: any): Observable<any> {
    return this.http.post<any>(environment.cart, request);
  }

  editCart(request: any): Observable<any> {
    return this.http.put<any>(environment.cart, request);
  }

  getCartWithId(id: number) {
    return this.http.get<any>(`${environment.cart}/${id}`);
  }

  deleteCart(id: number) {
    return this.http.delete<any>(`${environment.cart}/${id}`);
  }

  //   filterCountry(request: any): Observable<any> {
  //     return this.http.post<any>(
  //       `${environment.cart}/GetList/ByDynamic`,
  //       request
  //     );
  //   }
}
