import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { EmployeeAssetTypeService } from '../../../../../Services/Constants Services/employee-asset-type.service';
import { EmployeePrefixService } from '../../../../../Services/Constants Services/employee-prefix.service';

@Component({
  selector: 'app-add-new-employee-prefix-dialog',
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
  templateUrl: './add-new-employee-prefix-dialog.component.html',
  styleUrl: './add-new-employee-prefix-dialog.component.scss'
})
export class AddNewEmployeePrefixDialogComponent {
prefixFieldForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployeePrefixDialogComponent>,
    private fb: FormBuilder,
    private employeePrefixService: EmployeePrefixService,
    private snackBar: MatSnackBar

  ) {
    this.prefixFieldForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.prefixFieldForm.valid) {
      const employeeGroup = this.prefixFieldForm.value;
      this.employeePrefixService.createPrefix(employeeGroup).subscribe({
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