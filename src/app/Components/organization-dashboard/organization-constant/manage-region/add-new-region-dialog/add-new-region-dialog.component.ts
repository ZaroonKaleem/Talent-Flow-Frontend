import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRegionService } from '../../../../../Services/Constants Services/employee-region.service';

@Component({
  selector: 'app-add-new-region-dialog',
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
  templateUrl: './add-new-region-dialog.component.html',
  styleUrls: ['./add-new-region-dialog.component.scss']
})
export class AddNewRegionDialogComponent {
  regionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewRegionDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private regionService: EmployeeRegionService
  ) {
    this.regionForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.regionForm.valid) {
      const regionData = {
        id: this.regionForm.value.id,
        name: this.regionForm.value.name,
        code: this.regionForm.value.code
      };

      this.regionService.createRegion(regionData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Region created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create region', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating region:', error);
        }
      });
    }
  }
}