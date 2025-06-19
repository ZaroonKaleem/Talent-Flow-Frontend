import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeCountryService } from '../../../../../Services/Constants Services/employee-country.service';
import { EmployeeProvinceService } from '../../../../../Services/Constants Services/employee-province.service';

@Component({
  selector: 'app-add-new-province-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-new-province-dialog.component.html',
  styleUrls: ['./add-new-province-dialog.component.scss']
})
export class AddNewProvinceDialogComponent implements OnInit {
  provinceForm: FormGroup;
  countries: any[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddNewProvinceDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private provinceService: EmployeeProvinceService,
    private countryService: EmployeeCountryService
  ) {
    this.provinceForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      countryId: ['', Validators.required]  // Changed from 'code' to 'countryId'
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.isLoading = true;
    this.countryService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        this.countries = response.result.items || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
        this.snackBar.open('Failed to load countries', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.provinceForm.valid) {
      const provinceData = {
        id: this.provinceForm.value.id,
        name: this.provinceForm.value.name,
        countryId: this.provinceForm.value.countryId
      };

      this.provinceService.createProvince(provinceData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Province created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create province', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating province:', error);
        }
      });
    }
  }
}