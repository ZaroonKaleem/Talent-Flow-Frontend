import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeMaritalStatusService } from '../../../../../Services/Constants Services/employee-marital-status.service';

@Component({
  selector: 'app-add-new-marital-status-dialog',
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
  templateUrl: './add-new-marital-status.component.html',
  styleUrls: ['./add-new-marital-status.component.scss']
})
export class AddNewMaritalStatusDialogComponent {
  maritalStatusForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewMaritalStatusDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private maritalStatusService: EmployeeMaritalStatusService
  ) {
    this.maritalStatusForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.maritalStatusForm.valid) {
      const maritalStatusData = {
        id: this.maritalStatusForm.value.id,
        name: this.maritalStatusForm.value.name
      };

      this.maritalStatusService.createMaritalStatus(maritalStatusData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Marital Status created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Marital Status', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Marital Status:', error);
        }
      });
    }
  }
}