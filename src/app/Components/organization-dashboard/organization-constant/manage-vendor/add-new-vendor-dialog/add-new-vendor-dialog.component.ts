import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCountryService } from '../../../../../Services/Constants Services/employee-country.service';
import { EmployeeVendorService } from '../../../../../Services/Constants Services/employee-vendor.service';

@Component({
  selector: 'app-add-new-vendor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './add-new-vendor-dialog.component.html',
  styleUrls: ['./add-new-vendor-dialog.component.scss']
})
export class AddNewVendorDialogComponent implements OnInit {
  vendorForm: FormGroup;
  countries: any[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddNewVendorDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private countryService: EmployeeCountryService,
    private vendorService: EmployeeVendorService
  ) {
    this.vendorForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required],
      serviceChargesPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      hasVAT13Percent: [false],
      countryId: [null, Validators.required]
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
    if (this.vendorForm.valid) {
      this.isLoading = true;
      const vendorData = {
        id: this.vendorForm.value.id,
        name: this.vendorForm.value.name,
        code: this.vendorForm.value.code,
        serviceChargesPercentage: this.vendorForm.value.serviceChargesPercentage.toString(),
        hasVAT13Percent: this.vendorForm.value.hasVAT13Percent,
        countryId: this.vendorForm.value.countryId.toString()
      };

      this.vendorService.createVendor(vendorData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Vendor created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Failed to create vendor', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating vendor:', error);
          this.isLoading = false;
        }
      });
    }
  }
}