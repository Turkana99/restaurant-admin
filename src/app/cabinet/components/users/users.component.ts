import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, finalize, Observable, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(private dataService: UsersService, private router: Router) {}

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
      key: 'firstName',
      name: 'Ad',
    },
    {
      key: 'lastName',
      name: 'Soyad',
    },
    {
      key: 'statusType',
      name: 'Status',
    },
    {
      key: 'username',
      name: 'İstifadəçi adı',
    },
    {
      key: 'roles',
      name: 'Rollar',
    },
  ];

  ngOnInit(): void {
    this.data$ = this.page$.pipe(
      switchMap((pageEvent) =>
        this.dataService.getAll(pageEvent.pageIndex, pageEvent.pageSize).pipe(
          tap((response) => {
            this.rows = response.items.map((x: any) => {
              x.roles = x.operationClaims.join(', ');
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
    this.router.navigate(['/new-user', id]);
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
