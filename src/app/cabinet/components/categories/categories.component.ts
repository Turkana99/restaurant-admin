import { Component } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(private dataService: CategoriesService, private router: Router) {}

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
      key: 'name',
      name: 'Kateqoriya',
      width: '80',
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
