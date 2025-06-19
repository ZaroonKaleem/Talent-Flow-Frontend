import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { EmployeeJobTitleService } from '../../../../../Services/Constants Services/employee-job-title.service';

@Component({
  selector: 'app-add-new-job-title-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-new-job-title-dialog.component.html',
  styleUrl: './add-new-job-title-dialog.component.scss'
})
export class AddNewJobTitleDialogComponent {
  jobTitleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewJobTitleDialogComponent>,
    private fb: FormBuilder,
    private employeeJobTitle: EmployeeJobTitleService,
    private snackBar: MatSnackBar
  ) {
    this.jobTitleForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.jobTitleForm.valid) {
      const designation = this.jobTitleForm.value;
      this.employeeJobTitle.createJobTitle(designation).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Designation created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create designation.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating designation:', error);
        }
      });
    }
  }
}