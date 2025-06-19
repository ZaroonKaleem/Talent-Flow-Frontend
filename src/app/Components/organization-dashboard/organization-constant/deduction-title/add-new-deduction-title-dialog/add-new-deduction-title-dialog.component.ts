import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDeductionService } from '../../../../../Services/Constants Services/employee-deduction.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-deduction-title-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './add-new-deduction-title-dialog.component.html',
  styleUrls: ['./add-new-deduction-title-dialog.component.scss']
})
export class AddNewDeductionTitleDialogComponent {
  deductionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewDeductionTitleDialogComponent>,
    private fb: FormBuilder,
    private employeeDeductionService: EmployeeDeductionService,
    private snackBar: MatSnackBar
  ) {
    this.deductionForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      deductionType: [1, Validators.required], // Default to type 1
      isAmount: [false]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.deductionForm.valid) {
      const deduction = this.deductionForm.value;
      this.employeeDeductionService.createDeduction(deduction).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Deduction created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create deduction.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating deduction:', error);
        }
      });
    }
  }
}