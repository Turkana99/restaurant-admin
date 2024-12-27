import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAll(pageSize: number, pageIndex: number): Observable<any> {
    const params = new HttpParams()
      .set('PageSize', pageSize.toString())
      .set('PageIndex', pageIndex.toString());
    return this.http.get<any>(environment.product, { params });
  }

  getLookup(): Observable<any> {
    return this.http.get<any>(environment.product);
  }

  add(request: any): Observable<any> {
    return this.http.post<any>(environment.product, request);
  }

  edit(request: any): Observable<any> {
    return this.http.put<any>(environment.product, request);
  }

  getById(id: number) {
    return this.http.get<any>(`${environment.product}/get-by-id/${id}`);
  }

  delete(id: number) {
    return this.http.delete<any>(`${environment.product}/${id}`);
  }

  deleteAttachment(id: number) {
    return this.http.delete<any>(
      `${environment.product}/delete-product-attachment/${id}`
    );
  }
}
