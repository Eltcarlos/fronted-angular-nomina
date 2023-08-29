import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginatorModule
import { Advisor } from '@models/commercial.model';
import { CommercialService } from '@services/commercial.service';
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Dialog } from '@angular/cdk/dialog';
import { DialogCommercialComponent } from './components/dialog/dialog-commercial.component';
import { PayrollService } from '@services/payroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
})
export class CommercialComponent implements OnInit {
  displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Apellido',
    'Email',
    'documento',
    'celular',
    'NumeroCuenta',
    'categoria',
    'experience',
    'ventasMes',
    'createdAt',
    'acciones',
  ];
  faPenAlt = faPenAlt;
  faTrashAlt = faTrashAlt;

  dataSource = new MatTableDataSource<Advisor>();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Usar el tipado adecuado

  constructor(
    private commercialService: CommercialService,
    private dialog: Dialog,
    private payrollService: PayrollService,
    private router: Router
  ) {}

  ngOnInit() {
    this.commercialService.getAllCommercial().subscribe((commercial) => {
      this.dataSource.data = commercial.data;
      this.dataSource.paginator = this.paginator; // Mover el paginador aquí
    });
  }

  deleteAdvisor(advisorID: string) {
    this.commercialService
      .removeCommercial(advisorID)
      .subscribe((commercial: any) => {
        if (commercial.success) {
          window.location.reload();
          Swal.fire({
            icon: 'success',
            title: `${commercial.message}`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${commercial.message}`,
          });
        }
      });
  }

  updateAdvisor(advisor: Advisor) {
    this.dialog.open(DialogCommercialComponent, {
      minWidth: '300px',
      data: {
        created: false,
        ...advisor,
      },
    });
  }

  openDialog() {
    this.dialog.open(DialogCommercialComponent, {
      minWidth: '300px',
      minHeight: '200px',
      data: {
        created: true,
      },
    });
  }

  createPayroll(Commercial: any) {
    const data = {
      experience: Commercial.experience,
      commercialAdvisorId: Commercial._id,
    };
    this.payrollService.createPayroll(data).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: `Se ha generado correctamente la Nomina`,
          text: 'Una vez le de en confirmar lo redirigiremos a las tablas de la nomina la primera en la lista sera su nomina',
        }).then((status) => {
          if (status.isConfirmed) {
            this.router.navigate(['/dashboard/payroll']);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: `${error.error.message}`,
        });
      },
    });
  }
}
