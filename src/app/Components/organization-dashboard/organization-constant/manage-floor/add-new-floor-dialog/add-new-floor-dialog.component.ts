import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFloorService } from '../../../../../Services/Constants Services/employee-floor.service';

@Component({
  selector: 'app-add-new-floor-dialog',
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
  templateUrl: './add-new-floor-dialog.component.html',
  styleUrls: ['./add-new-floor-dialog.component.scss']
})
export class AddNewFloorDialogComponent {
  floorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewFloorDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private floorService: EmployeeFloorService
  ) {
    this.floorForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.floorForm.valid) {
      const floorData = {
        id: this.floorForm.value.id,
        name: this.floorForm.value.name
      };

      this.floorService.createFloor(floorData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Floor created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Floor', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Floor:', error);
        }
      });
    }
  }
}