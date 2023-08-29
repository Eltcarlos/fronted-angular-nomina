import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CommissionsComponent } from './pages/commissions/commissions.component';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { CommercialComponent } from './pages/commercial/commercial.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'commissions',
    component: CommissionsComponent,
  },
  {
    path: 'payroll',
    component: PayrollComponent,
  },
  {
    path: 'commercial',
    component: CommercialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
