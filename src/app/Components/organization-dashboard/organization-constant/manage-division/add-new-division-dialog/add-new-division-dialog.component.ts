import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDivisionService } from '../../../../../Services/Constants Services/employee-division.service';

@Component({
  selector: 'app-add-new-division-dialog',
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
  templateUrl: './add-new-division-dialog.component.html',
  styleUrls: ['./add-new-division-dialog.component.scss']
})
export class AddNewDivisionDialogComponent {
  divisionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewDivisionDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private divisionService: EmployeeDivisionService
  ) {
    this.divisionForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.divisionForm.valid) {
      const divisionData = {
        id: this.divisionForm.value.id,
        name: this.divisionForm.value.name
      };

      this.divisionService.createDivision(divisionData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Division created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Division', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Division:', error);
        }
      });
    }
  }
}