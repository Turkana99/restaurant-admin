import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { LangService } from '../../../../core/services/lang.service';
import { forkJoin, Observable, tap } from 'rxjs';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent {
  entityId: any;
  languages: any[] = [];
  CoverImage!: any;
  Attachments!: any[];

  data$ = new Observable<any>();

  form: any;
  allEntities: any[] = [];
  allCategories: any[] = [];
  attachments: File[] = [];
  coverImage: any;

  constructor(
    private fb: FormBuilder,
    private dataService: ProductsService,
    private categoryService: CategoriesService,
    private langService: LangService,
    private route: ActivatedRoute
  ) {
    this.entityId = +this.route.snapshot.params['id'];
  }

  get f() {
    return this.form.get('ProductLangs');
  }

  ngOnInit(): void {
    let streams = [
      this.langService.getLangs(),
      this.dataService.getLookup(),
      this.categoryService.getLookup(),
    ];

    if (this.entityId) {
      streams.push(this.dataService.getById(this.entityId));
    }

    this.data$ = forkJoin([...streams]).pipe(
      tap(([langs, allEntities, allCategories, entity]) => {
        this.languages = langs.items;

        this.form = this.fb.group({
          ProductLangs: this.fb.array(
            this.languages.map((el: any) => {
              return this.fb.group({
                name: [
                  entity
                    ? entity.productLanguages.find(
                        (x: any) => x.languageId == el.id
                      )?.name
                    : '',
                  Validators.required,
                ],
                description: [
                  entity
                    ? entity.productLanguages.find(
                        (x: any) => x.languageId == el.id
                      )?.description
                    : '',
                  Validators.required,
                ],
                languageId: el.id,
              });
            })
          ),
          Price: [entity ? entity.price : '', Validators.required],
          CategoryId: [entity ? entity.categoryId : null, Validators.required],
          CoverImage: [null],
          Attachments: [null],
        });
        this.allEntities = allEntities.items;
        this.allCategories = allCategories.items;

        this.CoverImage = entity?.coverImage;
        this.Attachments = entity?.productAttachments;
      })
    );
  }

  onSelectAttachments(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      for (let i = 0; i < input.files.length; i++) {
        this.attachments[i] = input.files[i];
      }
    }
  }

  onSelectCoverImage(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.coverImage = input.files[0];
    }
  }

  submit() {
    const request = new FormData();

    request.append('Price', this.form.value.Price);
    request.append('CategoryId', this.form.value.CategoryId);
    request.append('CoverImage', this.coverImage);

    this.form.value.ProductLangs.forEach((x: any, index: number) => {
      request.append(`ProductLangs[${index}].name`, x.name);
      request.append(`ProductLangs[${index}].description`, x.description);
      request.append(`ProductLangs[${index}].languageId`, x.languageId);
    });

    this.attachments.forEach((el: any) => {
      request.append(`Attachments`, el, el.name);
    });

    if (this.entityId) {
      request.append('Id', this.entityId);
      this.dataService.edit(request).subscribe((response: any) => {
        console.log('response', response);
      });
    } else {
      this.dataService.add(request).subscribe((response: any) => {
        console.log('response', response);
      });
    }
  }

  getImageUrl(url: string) {
    return `url(${encodeURI(url)})`;
  }

  deleteAttachment(id: number) {
    this.dataService.deleteAttachment(id).subscribe(() => {
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
}
