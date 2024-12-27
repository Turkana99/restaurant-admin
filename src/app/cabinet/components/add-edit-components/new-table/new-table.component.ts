import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LangService } from '../../../../core/services/lang.service';
import { forkJoin, Observable, tap } from 'rxjs';
import { TablesService } from '../../../../core/services/tables.service';

@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrl: './new-table.component.scss',
})
export class NewTableComponent {
  entityId: any;
  languages: any[] = [];

  data$ = new Observable<any>();

  form: any;
  allEntities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: TablesService,
    private langService: LangService,
    private route: ActivatedRoute
  ) {
    this.entityId = +this.route.snapshot.params['id'];
  }

  get f() {
    return this.form.get('tableLangs');
  }

  ngOnInit(): void {
    let streams = [this.langService.getLangs(), this.dataService.getLookup()];

    if (this.entityId) {
      streams.push(this.dataService.getById(this.entityId));
    }

    this.data$ = forkJoin([...streams]).pipe(
      tap(([langs, allEntities, entity]) => {
        this.languages = langs.items;

        this.form = this.fb.group({
          tableLangs: this.fb.array(
            this.languages.map((el: any, index: number) => {
              return this.fb.group({
                name: [
                  entity
                    ? entity.diningTableLanguages.find(
                        (x: any) => x.languageId == el.id
                      )?.name
                    : '',
                  Validators.required,
                ],
                languageId: el.id,
              });
            })
          ),
        });
        this.allEntities = allEntities.items;
      })
    );
  }

  submit() {
    const req = structuredClone(this.form.value);
    if (this.entityId) {
      req.id = this.entityId;
      this.dataService.edit(req).subscribe((response: any) => {
        console.log('response', response);
      });
    } else {
      this.dataService.add(req).subscribe((response: any) => {
        console.log('response', response);
      });
    }
  }
}
