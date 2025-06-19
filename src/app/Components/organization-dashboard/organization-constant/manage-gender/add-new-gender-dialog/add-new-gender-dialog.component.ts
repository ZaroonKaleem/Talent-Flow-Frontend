import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeGenderService } from '../../../../../Services/Constants Services/employee-gender.service';

@Component({
  selector: 'app-add-new-gender-dialog',
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
  templateUrl: './add-new-gender-dialog.component.html',
  styleUrls: ['./add-new-gender-dialog.component.scss']
})
export class AddNewGenderDialogComponent {
  genderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewGenderDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private genderService: EmployeeGenderService
  ) {
    this.genderForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.genderForm.valid) {
      const genderData = {
        id: this.genderForm.value.id,
        name: this.genderForm.value.name
      };

      this.genderService.createGender(genderData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Gender created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Gender', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Gender:', error);
        }
      });
    }
  }
}