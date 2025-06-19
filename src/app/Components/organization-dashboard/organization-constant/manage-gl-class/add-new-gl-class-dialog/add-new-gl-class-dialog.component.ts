import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeGlService } from '../../../../../Services/Constants Services/employee-gl.service';

@Component({
  selector: 'app-add-new-gl-class-dialog',
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
  templateUrl: './add-new-gl-class-dialog.component.html',
  styleUrls: ['./add-new-gl-class-dialog.component.scss']
})
export class AddNewGlClassDialogComponent {
  glClassForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewGlClassDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private glClassService: EmployeeGlService
  ) {
    this.glClassForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.glClassForm.valid) {
      const glClassData = {
        id: this.glClassForm.value.id,
        name: this.glClassForm.value.name,
        code: this.glClassForm.value.code
      };

      this.glClassService.createGlClass(glClassData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('GL Class created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create GL Class', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating GL Class:', error);
        }
      });
    }
  }
}