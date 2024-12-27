import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, skip, Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { TableMenuDialogComponent } from '../../../../dialogs/table-menu-dialog/table-menu-dialog.component';

@Component({
  selector: 'table-togglable-columns',
  templateUrl: './table-togglable-columns.component.html',
  styleUrls: ['./table-togglable-columns.component.scss'],
  animations: [
    trigger('filterExpand', [
      state(
        'collapsed,void',
        style({
          height: '0px',
          minHeight: '0',
          paddingTop: '0',
          paddingBottom: '0',
          overflow: 'hidden',
        })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableTogglableColumnsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: any[] = [];
  @Input() paginator: boolean = false;
  @Input() pageSizeOptions: number[] = [10, 50, 100];
  @Input() editButton: boolean = false;
  @Input() detailButton: boolean = false;
  @Input() deleteButton: boolean = false;
  @Input() editButtonText: string = 'Edit';
  @Input() deleteButtonText: string = 'Delete';
  @Input() detailButtonText: string = 'Detail';
  @Input() maxHeight: number = 650;
  @Input() columnWidth: string | number = 'auto';

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onDetail = new EventEmitter<any>();
  @Output() onPage = new EventEmitter<any>();

  @ViewChild(MatPaginator) private _paginator!: MatPaginator;
  @ViewChild(MatSort) private _sort!: MatSort;
  @ViewChildren('inputField') inputFields!: QueryList<MatInput>;
  dataSource2 = new MatTableDataSource<any>([]);

  filteredColumns: any[] = [];
  filteredColumnKeys: string[] = [];
  expandableFilteredColumns: any[] = [];
  expandableFilteredColumnKeys: any[] = [];
  private columnsData$ = new BehaviorSubject([]);
  private columnsDataSubscription = new Subscription();
  private _filters: any = {};
  private _applyFilterTimeout: any;
  private _removeFilterTimeout: any;
  private _displayedColumns: any[] = [];
  expandedElement: any;

  isHeaderExpanded = false;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource2 = new MatTableDataSource<any>(this.dataSource);
    this._displayedColumns = structuredClone(this.displayedColumns);
    if (this.editButton || this.deleteButton || this.detailButton) {
      this._displayedColumns.push({
        key: 'actions',
        name: '',
        active: true,
      });
    }

    this._filteredColumns = structuredClone(this._displayedColumns);
    this._displayedColumns = structuredClone(
      this._displayedColumns.map((x) => {
        x.active = true;
        return x;
      })
    );

    this.columnsDataSubscription = this.columnsData$
      .pipe(skip(1))
      .subscribe((val) => {
        this._filteredColumns = structuredClone(val);
        for (const element of this._displayedColumns) {
          element.active = this.filteredColumns.some(
            (x: any) => x.key == element.key
          );
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this._paginator;
    this.dataSource2.sort = this._sort;
  }

  toggleHeaderExpansion() {
    this.isHeaderExpanded = !this.isHeaderExpanded;
  }

  openDialog() {
    this.dialog.open(TableMenuDialogComponent, {
      position: {
        top: '200px',
      },
      width: '500px',
      data: {
        columnsData$: this.columnsData$,
        allColumns: this._displayedColumns,
      },
      autoFocus: false,
    });
  }

  private set _filteredColumns(val: any) {
    this.filteredColumns = val;
    this.filteredColumnKeys = structuredClone(this.filteredColumns).map(
      (x) => x.key
    );

    this.expandableFilteredColumnKeys = structuredClone(
      this.filteredColumns
    ).map((x) => x.key + '2');

    this.expandableFilteredColumns = structuredClone(this.filteredColumns).map(
      (x) => ({ ...x, key: x.key + '2' })
    );

    this._filters = {};
    this.applyFilter(true);
  }

  ngOnDestroy(): void {
    this.columnsDataSubscription.unsubscribe();
  }

  filterDataSource(key: string, $event: any, index: number) {
    clearTimeout(this._applyFilterTimeout);
    const currentKey = key.substring(0, key.length - 1);

    this._filters[index] = { key: currentKey, filter: $event.value };
    this._applyFilterTimeout = setTimeout(() => {
      this.applyFilter();
    }, 500);
  }

  resetCurrentFilter(key: string, element: any, index: number) {
    clearTimeout(this._removeFilterTimeout);
    element.value = '';
    delete this._filters[index];
    this._removeFilterTimeout = setTimeout(() => {
      this.applyFilter(true);
    }, 500);
  }

  applyFilter(reset = false) {
    if (reset) {
      this.dataSource2.data = this.dataSource;
    }

    let filteredCollection = structuredClone(this.dataSource);

    for (const element in this._filters) {
      let temp = this._filters[element];
      filteredCollection = filteredCollection.filter((x: any) =>
        x[temp.key]
          .toString()
          .toLocaleLowerCase()
          .includes(temp.filter.toString().toLocaleLowerCase())
      );
    }

    this.dataSource2.data = filteredCollection;
  }

  onPageChange(event: PageEvent) {
    this.onPage.emit(event);
  }
}
