import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, finalize, Observable, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(private dataService: ProductsService, private router: Router) {}

  rows: any;

  private _defaultPage: PageEvent = {
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };

  data$!: Observable<any>;
  page$ = new BehaviorSubject<PageEvent>(this._defaultPage);

  displayedColumns: any[] = [
    {
      key: 'name',
      name: 'Ad',
    },
    {
      key: 'categoryName',
      name: 'Kateqoriya',
    },
    {
      key: 'price',
      name: 'Qiymət',
    },
  ];

  ngOnInit(): void {
    this.data$ = this.page$.pipe(
      switchMap((pageEvent) =>
        this.dataService.getAll(pageEvent.pageIndex, pageEvent.pageSize).pipe(
          tap((response) => {
            this.rows = response.items;
          })
        )
      )
    );
  }

  onPageChange($event: PageEvent) {
    this.page$.next($event);
  }

  editEntity(id: any) {
    this.router.navigate(['/new-product', id]);
  }

  deleteEntity(id: number) {
    this.dataService.delete(id).subscribe({
      complete: () => {
        this.reload();
      },
    });
  }

  reload() {
    this.page$.next(this._defaultPage);
  }
}
