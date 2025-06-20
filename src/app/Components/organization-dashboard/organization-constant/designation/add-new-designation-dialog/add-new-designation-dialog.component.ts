import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDesignationService } from '../../../../../Services/Constants Services/employee-designation.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-designation-dialog',
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
  templateUrl: './add-new-designation-dialog.component.html',
  styleUrls: ['./add-new-designation-dialog.component.scss']
})
export class AddNewDesignationDialogComponent {
  designationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewDesignationDialogComponent>,
    private fb: FormBuilder,
    private employeeDesignationService: EmployeeDesignationService,
    private snackBar: MatSnackBar
  ) {
    this.designationForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.designationForm.valid) {
      const designation = this.designationForm.value;
      this.employeeDesignationService.createDesignation(designation).subscribe({
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