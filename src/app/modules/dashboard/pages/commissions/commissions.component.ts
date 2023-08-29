import { Component, OnInit } from '@angular/core';
import { CommissionService } from '../../../../services/commission.service';
import { CommissionData } from '@models/commission.model';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { OverlayPositionBuilder } from '@angular/cdk/overlay';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
})
export class CommissionsComponent implements OnInit {
  constructor(
    private commissionService: CommissionService,
    private dialog: Dialog
  ) {}
  commission: CommissionData[] = [];

  ngOnInit(): void {
    this.commissionService.getAllCommissions().subscribe((commission) => {
      this.commission = commission.data;
    });
  }

  openDialog() {
    this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      data: {
        created: true,
      },
    });
  }
}
