import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '@shared/shared.module';
import { CommissionsComponent } from './pages/commissions/commissions.component';
import { UsersTableComponent } from './pages/users/components/table/users-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { TodoDialogComponent } from './pages/commissions/components/todo-dialog/todo-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommercialComponent } from './pages/commercial/commercial.component';
import { DialogCommercialComponent } from './pages/commercial/components/dialog/dialog-commercial.component';

@NgModule({
  declarations: [
    UsersComponent,
    CommissionsComponent,
    UsersTableComponent,
    PayrollComponent,
    TodoDialogComponent,
    CommissionsComponent,
    CommercialComponent,
    DialogCommercialComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    FontAwesomeModule,
    DialogModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
