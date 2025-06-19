import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { EmployeeDesignationService } from '../../../../../Services/Constants Services/employee-designation.service';
import { AddNewDesignationDialogComponent } from '../../designation/add-new-designation-dialog/add-new-designation-dialog.component';
import { EmployerBankService } from '../../../../../Services/Constants Services/employer-bank.service';

@Component({
  selector: 'app-add-new-employer-bank-dialog',
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
  templateUrl: './add-new-employer-bank-dialog.component.html',
  styleUrl: './add-new-employer-bank-dialog.component.scss'
})
export class AddNewEmployerBankDialogComponent {
employerBankForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployerBankDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private employerBankService: EmployerBankService
  ) {
    this.employerBankForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      // code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.employerBankForm.valid) {
      const designation = this.employerBankForm.value;
      this.employerBankService.createBank(designation).subscribe({
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