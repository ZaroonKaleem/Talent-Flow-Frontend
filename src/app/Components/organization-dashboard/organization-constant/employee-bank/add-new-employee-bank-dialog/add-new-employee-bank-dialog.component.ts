import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { EmployeeDesignationService } from '../../../../../Services/Constants Services/employee-designation.service';
import { AddNewDesignationDialogComponent } from '../../designation/add-new-designation-dialog/add-new-designation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeBankService } from '../../../../../Services/Constants Services/employee-bank.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-employee-bank-dialog',
  standalone: true,
  imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule
  ],
  templateUrl: './add-new-employee-bank-dialog.component.html',
  styleUrl: './add-new-employee-bank-dialog.component.scss'
})
export class AddNewEmployeeBankDialogComponent {
  employeeBankForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewDesignationDialogComponent>,
    private fb: FormBuilder,
    private employeeDesignationService: EmployeeDesignationService,
    private snackBar: MatSnackBar,
    private employeeBankService : EmployeeBankService,
  ) {
    this.employeeBankForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.employeeBankForm.valid) {
      const designation = this.employeeBankForm.value;
      this.employeeBankService.createEmployeeBank(designation).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Designation created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create designation.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating designation:', error);
        }
      });
    }
  }
}