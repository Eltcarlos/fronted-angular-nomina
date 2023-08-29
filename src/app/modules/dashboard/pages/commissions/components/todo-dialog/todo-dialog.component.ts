import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStatus } from '@models/request-status.model';
import { CommissionService } from '../../../../../../services/commission.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent {
  constructor(
    private formBuilder: FormBuilder,
    private commissionService: CommissionService,
    private dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) data: any
  ) {
    this.commissionData = data;
    this.initializeForm();
  }
  status: RequestStatus = 'init';
  faX = faX;
  commissionData!: any;
  form: any = FormGroup;

  initializeForm() {
    const defaultFormValues = {
      experience: '',
      target: '',
      commissionTier1: '',
      commissionTier2: '',
      commissionTier3: '',
    };

    if (this.commissionData) {
      this.form = this.formBuilder.group({
        experience: [
          this.commissionData.experience || '',
          [Validators.required],
        ],
        target: [this.commissionData.target || '', [Validators.required]],
        commissionTier1: [
          this.commissionData.commissionTier1 || '',
          [Validators.required],
        ],
        commissionTier2: [
          this.commissionData.commissionTier2 || '',
          [Validators.required],
        ],
        commissionTier3: [
          this.commissionData.commissionTier3 || '',
          [Validators.required],
        ],
      });
    } else {
      this.form = this.formBuilder.group(defaultFormValues);
    }
  }

  create() {
    if (this.form.valid) {
      this.status = 'loading';
      const {
        experience,
        target,
        commissionTier1,
        commissionTier2,
        commissionTier3,
      } = this.form.getRawValue();
      const CommissionData: any = {
        experience,
        target,
        commissionTier1,
        commissionTier2,
        commissionTier3,
      };
      this.commissionService.createCommissions(CommissionData).subscribe({
        next: () => {
          this.status = 'success';
          Swal.fire({
            icon: 'success',
            title: `Se ha creado correctamente la comision`,
          }).then((status) => {
            if (status.isConfirmed) {
              window.location.reload();
            }
          });
        },
        error: (error) => {
          this.status = 'failed';
          Swal.fire({
            icon: 'error',
            title: `${error.error.message} con este tipo de Experiencia`,
          });
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  update() {
    const {
      experience,
      target,
      commissionTier1,
      commissionTier2,
      commissionTier3,
    } = this.form.getRawValue();
    const CommissionData: any = {
      _id: this.commissionData._id,
      experience,
      target,
      commissionTier1,
      commissionTier2,
      commissionTier3,
    };
    this.commissionService.updateCommissions(CommissionData).subscribe({
      next: () => {
        this.status = 'success';
        Swal.fire({
          icon: 'success',
          title: `Se ha actualizado correctamente la comision`,
        }).then((status) => {
          if (status.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: (error) => {
        this.status = 'failed';
        Swal.fire({
          icon: 'error',
          title: `${error.error.message}`,
        });
      },
    });
  }

  exit() {
    this.dialogRef.close();
  }
}
