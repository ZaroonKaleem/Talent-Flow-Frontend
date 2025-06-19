import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeAllowanceService } from '../../../../../Services/Constants Services/employee-allowance.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-allowance-title-dialog',
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
      MatCheckbox,
      MatCheckboxModule
  ],
  templateUrl: './add-new-allowance-title-dialog.component.html',
  styleUrl: './add-new-allowance-title-dialog.component.scss'
})
export class AddNewAllowanceTitleDialogComponent {
 allowanceTitleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewAllowanceTitleDialogComponent>,
    private fb: FormBuilder,
    private employeeAllowanceService: EmployeeAllowanceService,
    private snackBar: MatSnackBar
  ) {
    this.allowanceTitleForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      isAmount: [false]
    });
  }

  logCheckboxValue() {
  console.log('Checkbox value:', this.allowanceTitleForm.get('isAmmount')?.value);
}

onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.allowanceTitleForm.valid) {
      const allowance = this.allowanceTitleForm.value;
      this.employeeAllowanceService.createAllowance(allowance).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Allowance created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create Allowance.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating designation:', error);
        }
      });
    }
  }
}