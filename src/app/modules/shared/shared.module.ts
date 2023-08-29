import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [ButtonComponent, TableComponent, CardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  exports: [ButtonComponent, TableComponent, CardComponent],
})
export class SharedModule {}
