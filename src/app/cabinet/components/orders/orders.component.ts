import { Component } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  constructor(private dataService: OrdersService, private router: Router) {}

  rows!: any[];

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
      key: 'ingredients',
      name: 'Sifarişin tərkibi',
    },
    {
      key: 'diningTable',
      name: 'Masa',
    },
    {
      key: 'totalPrice',
      name: 'Qiymət',
    },
    {
      key: 'orderDate',
      name: 'Tarixi',
    },
  ];

  ngOnInit(): void {
    this.data$ = this.page$.pipe(
      switchMap((pageEvent) =>
        this.dataService.getAll(pageEvent.pageIndex, pageEvent.pageSize).pipe(
          tap((response) => {
            this.rows = response.items.map((x: any) => {
              x.orderDate = x.orderDate;
              x.diningTable = x?.cart?.diningTable;
              x.ingredients = x?.cart?.cartItems
                .map((item: any) => `${item.productName} x ${item.quantity}`)
                .join(' | ');

              return x;
            });
          })
        )
      )
    );
  }

  onPageChange($event: PageEvent) {
    this.page$.next($event);
  }

  editEntity(id: any) {
    this.router.navigate(['/new-category', id]);
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
