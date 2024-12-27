import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { LangService } from '../../../../core/services/lang.service';
import { forkJoin, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  entityId: any;
  languages: any[] = [];

  data$ = new Observable<any>();

  form: any;
  allCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: CategoriesService,
    private langService: LangService,
    private route: ActivatedRoute
  ) {
    this.entityId = +this.route.snapshot.params['id'];
  }

  get f() {
    return this.form.get('categoryLangs');
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
          ownerId: null,
          categoryLangs: this.fb.array(
            this.languages.map((el: any, index: number) => {
              return this.fb.group({
                name: [
                  entity
                    ? entity.categoryLanguages.find(
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
        this.allCategories = allEntities.items;
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
