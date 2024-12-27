import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'table-menu-dialog',
  templateUrl: './table-menu-dialog.component.html',
  styleUrls: ['./table-menu-dialog.component.scss'],
})
export class TableMenuDialogComponent {
  columnsData$: BehaviorSubject<any> = new BehaviorSubject(null);
  allColumns: any[] = [];
  formGroup: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.columnsData$ = this.data.columnsData$;
    this.allColumns = this.data.allColumns;

    this.initForm(this.allColumns);

    this.formGroup.valueChanges.subscribe((val) => {
      this.columnsData$.next(this.objectToArray(val));
    });
  }

  initForm(allColumns: any[]) {
    this.formGroup = this.fb.group(this.arrayToObject(allColumns));
  }

  arrayToObject = (allColumns: any[]): any => {
    let temp: any = {};
    for (const column of allColumns) {
      temp[column.key] = column.active;
    }

    return temp;
  };

  objectToArray = (object: any): any[] => {
    let temp = [];
    for (const key in object) {
      if (object[key] == true) {
        temp.push({
          key: key,
          name: this.allColumns.find((x: any) => x.key == key).name,
        });
      }
    }
    return temp;
  };
}
