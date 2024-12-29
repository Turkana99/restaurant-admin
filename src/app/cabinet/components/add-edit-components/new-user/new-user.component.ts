import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  entityId: any;
  form: any;
  roles: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: UsersService,
    private route: ActivatedRoute
  ) {
    this.entityId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.initForm();
    this.loadData();
    if (this.entityId) {
      this.getUserById(this.entityId);
      this.form.get('password').clearValidators();
      this.form.get('password').updateValueAndValidity();
    }
  }
  
  initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', this.entityId ? [] : [Validators.required]],
      operationClaimIds: [[], Validators.required],
      status: [false], // Set a default value for status if applicable
    });
  }
  


  loadData() {
    forkJoin({
      operationClaims: this.dataService.getOperationClaims().pipe(
        catchError((error) => {
          console.error('Error fetching persons:', error);
          return of({ items: [] });
        })
      ),
    }).subscribe(({ operationClaims }) => {
      this.roles = operationClaims;
    });
  }

  getUserById(id: number) {
    this.dataService.getById(id).subscribe((response) => {
      this.form.patchValue({
        firstName: response.firstName,
        lastName: response.lastName,
        username: response.username,
        status: response.status,
        operationClaimIds: response.operationClaimIds,
      });
    });
  }

  get operationClaimIds() {
    return this.form.get('operationClaimIds') as FormArray;
  }

  submit() {
    if (this.form.invalid) return; // Prevent submission of invalid forms
  
    const formValue = this.form.value;
    let req = {
      ...formValue,
      operationClaimIds: this.operationClaimIds.value,
    };
  
    const saveObservable = this.entityId
      ? this.dataService.edit({ ...req, id: this.entityId })
      : this.dataService.add(req);
  
    saveObservable.subscribe(
      () => {
        console.log('User saved successfully!');
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  }
  
}
