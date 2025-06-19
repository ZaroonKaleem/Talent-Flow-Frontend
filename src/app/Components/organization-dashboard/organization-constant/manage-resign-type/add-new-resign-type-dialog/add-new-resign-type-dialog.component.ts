import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { EmployeeResignTypeService } from '../../../../../Services/Constants Services/employee-resign-type.service';

@Component({
  selector: 'app-add-new-resign-type-dialog',
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
  templateUrl: './add-new-resign-type-dialog.component.html',
  styleUrl: './add-new-resign-type-dialog.component.scss'
})
export class AddNewResignTypeDialogComponent {
 resignTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewResignTypeDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private resignTypeService: EmployeeResignTypeService
  ) {
    this.resignTypeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.resignTypeForm.valid) {
      const resignTypeData = {
        id: this.resignTypeForm.value.id,
        name: this.resignTypeForm.value.name
      };

      this.resignTypeService.createResignType(resignTypeData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Resign Type created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Resign Type', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Resign Type:', error);
        }
      });
    }
  }
}