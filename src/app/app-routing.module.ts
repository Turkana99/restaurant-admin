import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetGuard } from './core/guards/cabinet.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./cabinet/cabinet.module').then((m) => m.CabinetModule),
    canActivate: [CabinetGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
