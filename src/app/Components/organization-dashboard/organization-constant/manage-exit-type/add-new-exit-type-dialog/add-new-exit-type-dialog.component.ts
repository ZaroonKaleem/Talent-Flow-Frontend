import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeExitTypeService } from '../../../../../Services/Constants Services/employee-exit-type.service';

@Component({
  selector: 'app-add-new-exit-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './add-new-exit-type-dialog.component.html',
  styleUrls: ['./add-new-exit-type-dialog.component.scss']
})
export class AddNewExitTypeDialogComponent {
  exitTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewExitTypeDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private exitTypeService: EmployeeExitTypeService
  ) {
    this.exitTypeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      isResignationDateRequired: [true] // Default to true as per your API model
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.exitTypeForm.valid) {
      const exitTypeData = {
        id: this.exitTypeForm.value.id,
        name: this.exitTypeForm.value.name,
        isResignationDateRequired: this.exitTypeForm.value.isResignationDateRequired
      };

      this.exitTypeService.createExitType(exitTypeData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Exit Type created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Exit Type', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Exit Type:', error);
        }
      });
    }
  }
}