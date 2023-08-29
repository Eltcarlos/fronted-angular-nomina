import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '@shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FontAwesomeModule,
    SharedModule,
    DialogModule,
  ],
})
export class LayoutModule {}
