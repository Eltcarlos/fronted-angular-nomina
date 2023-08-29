import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginatorModule
import { Payroll } from '@models/payroll.model';
import { PayrollService } from '@services/payroll.service';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
})
export class PayrollComponent implements OnInit {
  displayedColumns: string[] = ['NominaID', 'AsesorID', 'CreatedAt', 'PDF'];
  faFilePdf = faFilePdf;

  dataSource = new MatTableDataSource<Payroll>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private payrollService: PayrollService) {}

  ngOnInit() {
    this.payrollService.getAllPayroll().subscribe((payroll) => {
      this.dataSource.data = payroll.data;
      this.dataSource.paginator = this.paginator;
    });
  }
}
