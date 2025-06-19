import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeUniversityService } from '../../../../../Services/Constants Services/employee-university.service';

@Component({
  selector: 'app-add-new-university-dialog',
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
  templateUrl: './add-new-university-dialog.component.html',
  styleUrls: ['./add-new-university-dialog.component.scss']
})
export class AddNewUniversityDialogComponent {
  universityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewUniversityDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private universityService: EmployeeUniversityService
  ) {
    this.universityForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.universityForm.valid) {
      const universityData = {
        id: this.universityForm.value.id,
        name: this.universityForm.value.name
      };

      this.universityService.createUniversity(universityData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('University created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create University', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating University:', error);
        }
      });
    }
  }
}