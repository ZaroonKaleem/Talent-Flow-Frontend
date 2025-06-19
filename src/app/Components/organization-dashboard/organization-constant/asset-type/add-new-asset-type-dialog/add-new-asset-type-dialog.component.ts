import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeJobFieldService } from '../../../../../Services/Constants Services/employee-job-field.service';
import { EmployeeAssetTypeService } from '../../../../../Services/Constants Services/employee-asset-type.service';

@Component({
  selector: 'app-add-new-asset-type-dialog',
  standalone: true,
  imports: [
       CommonModule,
            MatDialogModule,
            MatButtonModule,
            MatInputModule,
            MatFormFieldModule,
            FormsModule,
            ReactiveFormsModule
  ],
  templateUrl: './add-new-asset-type-dialog.component.html',
  styleUrl: './add-new-asset-type-dialog.component.scss'
})
export class AddNewAssetTypeDialogComponent {
jobFieldForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewAssetTypeDialogComponent>,
    private fb: FormBuilder,
    private employeeAssetTypeService: EmployeeAssetTypeService,
    private snackBar: MatSnackBar

  ) {
    this.jobFieldForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.jobFieldForm.valid) {
      const employeeGroup = this.jobFieldForm.value;
      this.employeeAssetTypeService.createassetType(employeeGroup).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Employee group created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create employee group.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating employee group:', error);
        }
      });
    }
  }
}