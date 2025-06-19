import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeExpenseUnitService } from '../../../../../Services/Constants Services/employee-expense-unit.service';

@Component({
  selector: 'app-add-new-expense-unit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './add-new-expense-unit-dialog.component.html',
  styleUrls: ['./add-new-expense-unit-dialog.component.scss']
})
export class AddNewExpenseUnitDialogComponent {
  expenseUnitForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewExpenseUnitDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private expenseUnitService: EmployeeExpenseUnitService
  ) {
    this.expenseUnitForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.expenseUnitForm.valid) {
      const expenseUnitData = {
        id: this.expenseUnitForm.value.id,
        name: this.expenseUnitForm.value.name
      };

      this.expenseUnitService.createExpenseUnit(expenseUnitData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Expense Unit created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Expense Unit', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Expense Unit:', error);
        }
      });
    }
  }
}