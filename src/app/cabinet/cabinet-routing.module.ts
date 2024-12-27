import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { TablesComponent } from './components/tables/tables.component';
import { UsersComponent } from './components/users/users.component';
import { NewCategoryComponent } from './components/add-edit-components/new-category/new-category.component';
import { NewProductComponent } from './components/add-edit-components/new-product/new-product.component';
import { NewTableComponent } from './components/add-edit-components/new-table/new-table.component';
import { NewUserComponent } from './components/add-edit-components/new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'categories',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'new-category',
        component: NewCategoryComponent,
      },
      {
        path: 'new-category/:id',
        component: NewCategoryComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'new-product',
        component: NewProductComponent,
      },
      {
        path: 'new-product/:id',
        component: NewProductComponent,
      },
      {
        path: 'tables',
        component: TablesComponent,
      },
      {
        path: 'new-table',
        component: NewTableComponent,
      },
      {
        path: 'new-table/:id',
        component: NewTableComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'new-user',
        component: NewUserComponent,
      },
      {
        path: 'new-user/:id',
        component: NewUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
