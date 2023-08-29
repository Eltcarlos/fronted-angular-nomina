import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStatus } from '@models/request-status.model';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';
import { CommercialService } from '@services/commercial.service';

@Component({
  selector: 'app-dialog-commercial',
  templateUrl: './dialog-commercial.component.html',
})
export class DialogCommercialComponent {
  constructor(
    private formBuilder: FormBuilder,
    private commercialService: CommercialService,
    private dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) data: any
  ) {
    this.commercialData = data;
    this.initializeForm();
  }
  status: RequestStatus = 'init';
  faX = faX;
  commercialData!: any;
  form!: FormGroup;

  initializeForm() {
    const defaultFormValues = {
      firstName: '',
      lastName: '',
      email: '',
      document: '',
      phone: '',
      numberAccount: '',
      category: '',
      experience: '',
      monthlySales: '',
    };

    if (this.commercialData.created === false) {
      this.form = this.formBuilder.group({
        firstName: [
          this.commercialData.name.firstName || '',
          [Validators.required],
        ],
        lastName: [
          this.commercialData.name.lastName || '',
          [Validators.required],
        ],
        email: [
          this.commercialData.email || '',
          [Validators.required, Validators.email],
        ],
        document: [this.commercialData.document || '', [Validators.required]],
        phone: [this.commercialData.phone || '', [Validators.required]],
        numberAccount: [
          this.commercialData.numberAccount || '',
          [Validators.required],
        ],
        category: [this.commercialData.category || '', [Validators.required]],
        experience: [
          this.commercialData.experience || '',
          [Validators.required],
        ],
        monthlySales: [
          this.commercialData.monthlySales || '',
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
        firstName,
        lastName,
        email,
        document,
        phone,
        numberAccount,
        category,
        experience,
        monthlySales,
      } = this.form.getRawValue();
      const CommercialData: any = {
        name: {
          firstName,
          lastName,
        },
        email,
        document,
        phone,
        numberAccount,
        category,
        experience,
        monthlySales,
      };
      this.commercialService.createCommercial(CommercialData).subscribe({
        next: () => {
          this.status = 'success';
          Swal.fire({
            icon: 'success',
            title: `Se ha creado correctamente el asesor comercial`,
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
    } else {
      this.form.markAllAsTouched();
    }
  }

  update() {
    const {
      firstName,
      lastName,
      email,
      document,
      phone,
      numberAccount,
      category,
      experience,
      monthlySales,
    } = this.form.getRawValue();
    const CommercialData: any = {
      _id: this.commercialData._id,
      name: {
        firstName,
        lastName,
      },
      email,
      document,
      phone,
      numberAccount,
      category,
      experience,
      monthlySales,
    };
    this.commercialService.updateCommercial(CommercialData).subscribe({
      next: () => {
        this.status = 'success';
        Swal.fire({
          icon: 'success',
          title: `Se ha actualizado correctamente el asesor comercial`,
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
