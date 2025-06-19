import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeCountryService } from '../../../../../Services/Constants Services/employee-country.service';

@Component({
  selector: 'app-add-new-country-dialog',
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
  templateUrl: './add-new-country-dialog.component.html',
  styleUrl: './add-new-country-dialog.component.scss'
})
export class AddNewCountryDialogComponent {
 countryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewCountryDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private countryService: EmployeeCountryService,
  ) {
    this.countryForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.countryForm.valid) {
      const country = this.countryForm.value;
      this.countryService.createCountry(country).subscribe({
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