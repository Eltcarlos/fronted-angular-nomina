import { Component, Input } from '@angular/core';
import { CommissionService } from '../../../../services/commission.service';
import {
  faMoneyBill1,
  faPenAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from 'src/app/modules/dashboard/pages/commissions/components/todo-dialog/todo-dialog.component';
import { CommissionData } from '@models/commission.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() commission: any = {};
  faMoneyBill1 = faMoneyBill1;
  faPenAlt = faPenAlt;
  faTrashAlt = faTrashAlt;

  constructor(
    private commissionService: CommissionService,
    private dialog: Dialog
  ) {}

  formatCurrency(number: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  removeCommission(commissionID: string) {
    this.commissionService
      .removeCommissions(commissionID)
      .subscribe((commission: any) => {
        if (commission.success) {
          window.location.reload();
          Swal.fire({
            icon: 'success',
            title: `${commission.message}`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${commission.message}`,
          });
        }
      });
  }

  openDialog(commission: CommissionData) {
    this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      data: {
        created: false,
        ...commission,
      },
    });
  }
}
