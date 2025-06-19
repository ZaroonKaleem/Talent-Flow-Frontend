import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCostCenterService } from '../../../../../Services/Constants Services/employee-cost-center.service';

@Component({
  selector: 'app-add-new-cost-center-dialog',
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
  templateUrl: './add-new-cost-center-dialog.component.html',
  styleUrls: ['./add-new-cost-center-dialog.component.scss']
})
export class AddNewCostCenterDialogComponent {
  costCenterForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewCostCenterDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private costCenterService: EmployeeCostCenterService
  ) {
    this.costCenterForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.costCenterForm.valid) {
      const costCenterData = {
        id: this.costCenterForm.value.id,
        name: this.costCenterForm.value.name,
        code: this.costCenterForm.value.code
      };

      this.costCenterService.createCostCenter(costCenterData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Cost Center created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Cost Center', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Cost Center:', error);
        }
      });
    }
  }
}