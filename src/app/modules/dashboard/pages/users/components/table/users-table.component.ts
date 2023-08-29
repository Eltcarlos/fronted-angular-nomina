import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginatorModule
import { UserService } from '@services/user.service';
import { UserData } from '@models/user.model';

@Component({
  selector: 'users-app-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Apellido',
    'Email',
    'Role',
    'CreatedAt',
  ];

  dataSource = new MatTableDataSource<UserData>();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Usar el tipado adecuado

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users.data;
      this.dataSource.paginator = this.paginator; // Mover el paginador aquí
    });
  }
}
