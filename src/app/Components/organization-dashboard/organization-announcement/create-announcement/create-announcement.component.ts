import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DropdownService } from '../../../../Services/dropdowns.service';
import { AnnouncementService } from '../../../../Services/announcement.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule, MatError, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatError,
    MatLabel,
    MatRippleModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {
  announcementForm: FormGroup;
  isSubmitting = false;
  selectedFile: File | null = null;

  // Dropdown data
  announcementTypes: any[] = [];
  employeeStatuses: any[] = [];
  genders: any[] = [];
  stations: any[] = [];
  departments: any[] = [];
  employeeGroups: any[] = [];
  designations: any[] = [];
  employees: any[] = [];
  attachmentOptions = [
    { id: 0, name: 'None' },
    { id: 1, name: 'File Upload' },
    { id: 2, name: 'External Link' }
  ];

  constructor(
    private fb: FormBuilder,
    private dropdownService: DropdownService,
    private announcementService: AnnouncementService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
this.announcementForm = this.fb.group({
  name: ['', Validators.required],
  announcementTypeId: ['', Validators.required],
  displayStartDate: ['', Validators.required],
  displayEndDate: ['', Validators.required],
  employeeStatusId: [''],
  genderId: [''],
  employeeStationIds: [[]],
  departmentIds: [[]],
  employeeGroupIds: [[]],
  designationIds: [[]],
  exemptedEmployeeIds: [[]],
  attachmentOption: [0],
  attachmentPath: [''],
  description: ['']
});
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    const dropdowns = [
      'AnnouncementType',
      'EmployeeStatus',
      'Gender',
      'EmployeeStation',
      'Department',
      'EmployeeGroup',
      'Designation',
      'Employee'
    ];

    this.dropdownService.getDropdownData(dropdowns).subscribe({
      next: (response) => {
        this.announcementTypes = response.result.find((r: { target: string; }) => r.target === 'AnnouncementType')?.data.items || [];
        this.employeeStatuses = response.result.find((r: { target: string; }) => r.target === 'EmployeeStatus')?.data.items || [];
        this.genders = response.result.find((r: { target: string; }) => r.target === 'Gender')?.data.items || [];
        this.stations = response.result.find((r: { target: string; }) => r.target === 'EmployeeStation')?.data.items || [];
        this.departments = response.result.find((r: { target: string; }) => r.target === 'Department')?.data.items || [];
        this.employeeGroups = response.result.find((r: { target: string; }) => r.target === 'EmployeeGroup')?.data.items || [];
        this.designations = response.result.find((r: { target: string; }) => r.target === 'Designation')?.data.items || [];
        this.employees = response.result.find((r: { target: string; }) => r.target === 'Employee')?.data.items || [];
      },
      error: (error) => {
        console.error('Error loading dropdown data:', error);
        this.snackBar.open('Failed to load dropdown data', 'Close', { duration: 3000 });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.announcementForm.patchValue({
      attachmentPath: this.selectedFile?.name || ''
    });
  }

  onSubmit(): void {
    if (this.announcementForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formData = this.announcementForm.value;

    // Format dates to ISO string
    formData.displayStartDate = new Date(formData.displayStartDate).toISOString();
    formData.displayEndDate = new Date(formData.displayEndDate).toISOString();

    this.announcementService.createAnnouncement(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Announcement created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/announcements']);
      },
      error: (error) => {
        console.error('Error creating announcement:', error);
        this.snackBar.open('Failed to create announcement', 'Close', { duration: 3000 });
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/organization-dashboard/announcements']);
  }
}