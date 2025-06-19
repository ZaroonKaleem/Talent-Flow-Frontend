import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeCityService } from '../../../../../Services/Constants Services/employee-city.service';
import { EmployeeCountryService } from '../../../../../Services/Constants Services/employee-country.service';
import { EmployeeProvinceService } from '../../../../../Services/Constants Services/employee-province.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-city-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-new-city-dialog.component.html',
  styleUrls: ['./add-new-city-dialog.component.scss']
})
export class AddNewCityDialogComponent implements OnInit {
  cityForm: FormGroup;
  countries: any[] = [];
  provinces: any[] = [];
  filteredProvinces: any[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddNewCityDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private countryService: EmployeeCountryService,
    private provinceService: EmployeeProvinceService,
    private cityService: EmployeeCityService
  ) {
    this.cityForm = this.fb.group({
  id: [0],
  name: ['', Validators.required],
  code: ['', Validators.required],  // Add this field
  provinceId: [null, Validators.required],
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

  onCountryChange(): void {
    const countryId = this.cityForm.get('countryId')?.value;
    this.cityForm.get('provinceId')?.reset();
    
    if (countryId) {
      this.isLoading = true;
      this.provinceService.getAllProvinces(countryId).subscribe({
        next: (response) => {
          this.provinces = response.result.items || [];
          this.filteredProvinces = this.provinces;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading provinces:', error);
          this.snackBar.open('Failed to load provinces', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.cityForm.valid) {
      this.isLoading = true;
      this.isLoading = true;
    const cityData = {
      id: this.cityForm.value.id,
      name: this.cityForm.value.name,
      code: this.cityForm.value.code,  // Include the code
      // Include additional fields if your API accepts them
      provinceId: this.cityForm.value.provinceId,
      countryId: this.cityForm.value.countryId
    };

      this.cityService.createCity(cityData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('City created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Failed to create city', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating city:', error);
          this.isLoading = false;
        }
      });
    }
  }
}