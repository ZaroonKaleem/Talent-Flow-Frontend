import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeGroupService } from '../../../../../Services/Constants Services/employee-group-service.service';
import { EmployeeJobFieldService } from '../../../../../Services/Constants Services/employee-job-field.service';

@Component({
  selector: 'app-add-new-job-field-dialog',
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
  templateUrl: './add-new-job-field-dialog.component.html',
  styleUrl: './add-new-job-field-dialog.component.scss'
})
export class AddNewJobFieldDialogComponent {
jobFieldForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewJobFieldDialogComponent>,
    private fb: FormBuilder,
    private employeeJobFieldService: EmployeeJobFieldService,
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
      this.employeeJobFieldService.createJobField(employeeGroup).subscribe({
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