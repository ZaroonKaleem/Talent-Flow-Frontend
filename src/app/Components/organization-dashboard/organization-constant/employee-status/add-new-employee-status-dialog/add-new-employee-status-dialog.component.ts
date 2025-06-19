import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeDesignationService } from '../../../../../Services/Constants Services/employee-designation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeStatusService } from '../../../../../Services/Constants Services/employee-status.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-employee-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './add-new-employee-status-dialog.component.html',
  styleUrl: './add-new-employee-status-dialog.component.scss'
})
export class AddNewEmployeeStatusDialogComponent {
  employeeStatusForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployeeStatusDialogComponent>,
    private fb: FormBuilder,
    private employeeStatusService :EmployeeStatusService,
    private snackBar: MatSnackBar
  ) {
    this.employeeStatusForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      isContractual: [false]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.employeeStatusForm.valid) {
      const designation = this.employeeStatusForm.value;
      this.employeeStatusService.createDesignation(designation).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Employee Group created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create employee group.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating employee group:', error);
        }
      });
    }
  }
}