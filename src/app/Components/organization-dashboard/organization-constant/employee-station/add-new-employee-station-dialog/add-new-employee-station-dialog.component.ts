import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeStationService } from '../../../../../Services/Constants Services/employee-station.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeAreaService } from '../../../../../Services/Constants Services/employee-area.service';

@Component({
  selector: 'app-add-new-employee-station-dialog',
  standalone: true,
  imports: [
      CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatOption,
        MatSelectModule
  ],
  templateUrl: './add-new-employee-station-dialog.component.html',
  styleUrls: ['./add-new-employee-station-dialog.component.scss']
})
export class AddNewEmployeeStationDialogComponent implements OnInit {
  stationForm: FormGroup;
  areas: any[] = []; // Using any type since we don't have models
  employees: any[] = []; // Using any type since we don't have models
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployeeStationDialogComponent>,
    private fb: FormBuilder,
    private employeeStationService: EmployeeStationService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private employeeAreaService : EmployeeAreaService
  ) {
    this.stationForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required],
      areaId: [null, Validators.required],
      stationHeadId: [null],
      hrManagerId: [null],
      accountsManagerId: [null]
    });
  }

  ngOnInit(): void {
    this.loadAreas();
    this.loadEmployees();
  }

   loadAreas(): void {
    this.employeeAreaService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        this.areas = response.result.items || [];
      },
      error: (error) => {
        console.error('Error loading areas:', error);
        this.snackBar.open('Failed to load areas', 'Close', { duration: 3000 });
      }
    });
  }

  loadEmployees(): void {
    // Example employee API call - replace with your actual endpoint
    this.http.get<any>('http://37.27.186.67:443/api/services/app/Employee/GetAll').subscribe({
      next: (response) => {
        this.employees = response.result.items || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoading = false;
        this.snackBar.open('Failed to load employees', 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.stationForm.valid) {
      const stationData = {
        id: this.stationForm.value.id,
        name: this.stationForm.value.name,
        code: this.stationForm.value.code,
        areaId: this.stationForm.value.areaId,
        stationHeadId: this.stationForm.value.stationHeadId,
        hrManagerId: this.stationForm.value.hrManagerId,
        accountsManagerId: this.stationForm.value.accountsManagerId
      };

      // Clean up null/undefined values
      // Object.keys(stationData).forEach(key => {
      //   if (stationData[key] === null || stationData[key] === undefined) {
      //     delete stationData[key];
      //   }
      // });

      this.employeeStationService.createStation(stationData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Station created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create station', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating station:', error);
        }
      });
    }
  }
}