import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { MaterialModule } from '../material.module';
import { TableTogglableColumnsComponent } from './components/shared/table-togglable-columns/table-togglable-columns.component';
import { TableMenuDialogComponent } from '../dialogs/table-menu-dialog/table-menu-dialog.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuillModule } from 'ngx-quill';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { TablesComponent } from './components/tables/tables.component';
import { UsersComponent } from './components/users/users.component';
import { DividerModule } from 'primeng/divider';
import { NewCategoryComponent } from './components/add-edit-components/new-category/new-category.component';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { NewProductComponent } from './components/add-edit-components/new-product/new-product.component';
import { NewTableComponent } from './components/add-edit-components/new-table/new-table.component';
import { NewUserComponent } from './components/add-edit-components/new-user/new-user.component';

@NgModule({
  declarations: [
    CabinetComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    TableTogglableColumnsComponent,
    TableMenuDialogComponent,
    CategoriesComponent,
    OrdersComponent,
    ProductsComponent,
    TablesComponent,
    UsersComponent,
    NewCategoryComponent,
    NewProductComponent,
    NewTableComponent,
    NewUserComponent,
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    QuillModule.forRoot(),
    DividerModule,
    DropdownModule,
    TabMenuModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CabinetModule {}
