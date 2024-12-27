import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  constructor(private http: HttpClient) {}
  getSubCategories(pageSize: number, pageIndex: number): Observable<any> {
    const params = new HttpParams()
    .set('PageSize', pageSize.toString())
    .set('PageIndex', pageIndex.toString());
    return this.http.get<any>(environment.subCategory, {params});
  }

  addSubCategory(request: any): Observable<any> {
    return this.http.post<any>(environment.subCategory, request);
  }

  editSubCategory(request: any): Observable<any> {
    return this.http.put<any>(environment.subCategory, request);
  }

  getSubCategoryWithId(id: number) {
    return this.http.get<any>(`${environment.subCategory}/${id}`);
  }

  deleteSubCategory(id: number) {
    return this.http.delete<any>(`${environment.subCategory}/${id}`);
  }

  //   filterCountry(request: any): Observable<any> {
  //     return this.http.post<any>(
  //       `${environment.cart}/GetList/ByDynamic`,
  //       request
  //     );
  //   }
}
