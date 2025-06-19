import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EmployeeMinimumWageService } from '../../../../../Services/Constants Services/employee-minimum-wage.service';
import { EmployeeProvinceService } from '../../../../../Services/Constants Services/employee-province.service';

@Component({
  selector: 'app-add-new-minimum-wage-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './add-new-minimum-wage-dialog.component.html'
})
export class AddNewMinimumWageDialogComponent implements OnInit {
  minimumWageData = {
    id: 0,
    name: '',
    provinceId: 0
  };
  provinces: any[] = [];

  constructor(
    private minimumWageService: EmployeeMinimumWageService,
    private provinceService: EmployeeProvinceService,
    public dialogRef: MatDialogRef<AddNewMinimumWageDialogComponent>
  ) {}

  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces() {
    this.provinceService.getAllProvinces().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.provinces = response.result.items;
        } else {
          this.provinces = [];
        }
      },
      error: (error) => {
        console.error('Error loading provinces:', error);
        this.provinces = [];
      }
    });
  }

  onSave() {
    if (this.minimumWageData.name && this.minimumWageData.provinceId) {
      this.minimumWageService.createMinimumWage(this.minimumWageData).subscribe({
        next: (response) => {
          if (response.success) {
            this.dialogRef.close(this.minimumWageData);
          }
        },
        error: (error) => {
          console.error('Error creating minimum wage:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}