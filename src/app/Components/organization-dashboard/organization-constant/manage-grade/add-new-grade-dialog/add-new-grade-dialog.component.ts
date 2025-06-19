import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeGradeService } from '../../../../../Services/Constants Services/employee-grade.service';

@Component({
  selector: 'app-add-new-grade-dialog',
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
  templateUrl: './add-new-grade-dialog.component.html',
  styleUrls: ['./add-new-grade-dialog.component.scss']
})
export class AddNewGradeDialogComponent {
  gradeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewGradeDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private gradeService: EmployeeGradeService
  ) {
    this.gradeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.gradeForm.valid) {
      const gradeData = {
        id: this.gradeForm.value.id,
        name: this.gradeForm.value.name
      };

      this.gradeService.createGrade(gradeData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Grade created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Grade', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Grade:', error);
        }
      });
    }
  }
}