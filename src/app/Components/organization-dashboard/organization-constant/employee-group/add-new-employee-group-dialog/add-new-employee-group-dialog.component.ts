import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Validators } from 'ngx-editor';
import { EmployeeGroupService } from '../../../../../Services/Constants Services/employee-group-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-employee-group-dialog',
  standalone: true,
  imports: [
      MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-new-employee-group-dialog.component.html',
  styleUrl: './add-new-employee-group-dialog.component.scss'
})
export class AddNewEmployeeGroupDialogComponent {
  employeeGroupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployeeGroupDialogComponent>,
    private fb: FormBuilder,
    private employeeGroupService: EmployeeGroupService,
    private snackBar: MatSnackBar

  ) {
    this.employeeGroupForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.employeeGroupForm.valid) {
      const employeeGroup = this.employeeGroupForm.value;
      this.employeeGroupService.createEmployeeGroup(employeeGroup).subscribe({
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