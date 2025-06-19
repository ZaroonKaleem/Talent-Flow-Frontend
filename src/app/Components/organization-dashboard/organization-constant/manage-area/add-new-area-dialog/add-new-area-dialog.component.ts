import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeAreaService } from '../../../../../Services/Constants Services/employee-area.service';
import { EmployeeCityService } from '../../../../../Services/Constants Services/employee-city.service';
import { EmployeeCountryService } from '../../../../../Services/Constants Services/employee-country.service';
import { EmployeeProvinceService } from '../../../../../Services/Constants Services/employee-province.service';

@Component({
  selector: 'app-add-new-area-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule 
  ],
  templateUrl: './add-new-area-dialog.component.html',
  styleUrls: ['./add-new-area-dialog.component.scss']
})
export class AddNewAreaDialogComponent implements OnInit {
  areaForm: FormGroup;
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  filteredProvinces: any[] = [];
  filteredCities: any[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddNewAreaDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private countryService: EmployeeCountryService,
    private provinceService: EmployeeProvinceService,
    private cityService: EmployeeCityService,
    private areaService: EmployeeAreaService
  ) {
    this.areaForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      countryId: [null, Validators.required],
      provinceId: [null, Validators.required],
      cityId: [null, Validators.required]
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
    const countryId = this.areaForm.get('countryId')?.value;
    this.areaForm.get('provinceId')?.reset();
    this.areaForm.get('cityId')?.reset();
    this.filteredCities = [];
    
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

  onProvinceChange(): void {
    const provinceId = this.areaForm.get('provinceId')?.value;
    this.areaForm.get('cityId')?.reset();
    
    if (provinceId) {
      this.isLoading = true;
      this.cityService.getAllCities(provinceId).subscribe({
        next: (response) => {
          this.cities = response.result.items || [];
          this.filteredCities = this.cities;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading cities:', error);
          this.snackBar.open('Failed to load cities', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.areaForm.valid) {
      this.isLoading = true;
      const areaData = {
        id: this.areaForm.value.id,
        name: this.areaForm.value.name,
        cityId: this.areaForm.value.cityId,
        provinceId: this.areaForm.value.provinceId,
        countryId: this.areaForm.value.countryId
      };

      this.areaService.createArea(areaData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Area created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Failed to create area', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating area:', error);
          this.isLoading = false;
        }
      });
    }
  }
}