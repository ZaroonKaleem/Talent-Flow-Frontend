import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DayCloseService } from '../../../Services/day-close.service';

interface DayClose {
  id: number;
  employeeName: string;
  employeeCode: string;
  department: string;
  subDepartment?: string;
  station: string;
  dayCloseDate: Date;
  addedOn: Date;
  payrollSetup: string;
  employeeGroup: string;
  flag: string;
}

interface DayCloseResponse {
  result: DayClose[];
  totalCount: number;
}

@Component({
  selector: 'app-organization-day-close',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginator,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './organization-day-close.component.html',
  styleUrl: './organization-day-close.component.scss'
})
export class OrganizationDayCloseComponent implements OnInit {
  filterForm!: FormGroup;
  dataSource: MatTableDataSource<DayClose> = new MatTableDataSource<any>([]);
  totalCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Dropdown options
  stations = [
    { id: 1, name: 'Headquarters' },
    { id: 2, name: 'Regional Office East' },
    { id: 3, name: 'Regional Office West' },
    { id: 4, name: 'Field Office North' },
    { id: 5, name: 'Field Office South' }
  ];

  departments = [
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Operations' }
  ];

  subDepartments = [
    { id: 1, name: 'Recruitment' },
    { id: 2, name: 'Payroll' },
    { id: 3, name: 'Network' },
    { id: 4, name: 'Development' }
  ];

  employeeGroups = [
    { id: 1, name: 'All Employees' },
    { id: 2, name: 'Administrative Staff' },
    { id: 3, name: 'Technical Staff' },
    { id: 4, name: 'Contractual Staff' }
  ];

  payrollSetups = [
    { id: 1, name: 'Monthly' },
    { id: 2, name: 'Bi-Weekly' },
    { id: 3, name: 'Weekly' },
    { id: 4, name: 'Daily' }
  ];

  employees = [
    { id: 1, name: 'John Doe', code: 'EMP001' },
    { id: 2, name: 'Jane Smith', code: 'EMP002' },
    { id: 3, name: 'Robert Johnson', code: 'EMP003' },
    { id: 4, name: 'Emily Davis', code: 'EMP004' }
  ];

  flags = ['Red', 'Yellow', 'Green'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dayCloseService: DayCloseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDayCloses();
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      department: [''],
      subDepartment: [''],
      employeeGroup: [''],
      payrollSetup: [''],
      employee: [''],
      flag: [''],
      dayCloseDateFrom: [''],
      dayCloseDateTo: ['']
    });
  }

  fetchDayCloses() {
    this.isLoading = true;
    this.errorMessage = null;

    const params = this.buildParams();

    this.dayCloseService.getAll(params).subscribe({
      next: (response: DayCloseResponse) => {
        this.dataSource.data = response.result;
        this.totalCount = response.totalCount;
        this.isLoading = false;
        this.snackBar.open('Data loaded successfully', 'Close', { duration: 2000 });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load day close data. Please try again.';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        console.error('Error fetching day closes:', error);
      }
    });
  }

  applyFilters() {
    this.pageIndex = 0; // Reset to first page
    this.fetchDayCloses();
  }

  clearFilters() {
    this.filterForm.reset();
    this.pageIndex = 0;
    this.fetchDayCloses();
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  buildParams() {
    const formValues = this.filterForm.value;
    const params: any = {
      SkipCount: this.pageIndex * this.pageSize,
      MaxResultCount: this.pageSize
    };

    if (formValues.station) {
      params.StationId = formValues.station;
    }

    if (formValues.department) {
      params.DepartmentId = formValues.department;
    }

    if (formValues.subDepartment) {
      params.SubDepartmentId = formValues.subDepartment;
    }

    if (formValues.employeeGroup) {
      params.EmployeeGroupId = formValues.employeeGroup;
    }

    if (formValues.payrollSetup) {
      params.PayrollSetupId = formValues.payrollSetup;
    }

    if (formValues.employee) {
      params.EmployeeId = formValues.employee;
    }

    if (formValues.flag) {
      params.Flag = formValues.flag;
    }

    if (formValues.dayCloseDateFrom) {
      params.DayCloseDateFrom = new Date(formValues.dayCloseDateFrom).toISOString();
    }

    if (formValues.dayCloseDateTo) {
      params.DayCloseDateTo = new Date(formValues.dayCloseDateTo).toISOString();
    }

    return params;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchDayCloses();
  }

  viewDayClose(id: number): void {
    this.snackBar.open(`Viewing day close ${id}`, 'Close', { duration: 2000 });
  }

  editDayClose(id: number) {
    this.router.navigate(['/organization/day-close/edit', id]);
  }

  deleteDayClose(dayClose: DayClose) {
    // Implement delete functionality (API call needed)
    this.snackBar.open(`Day close ${dayClose.id} deleted`, 'Close', { duration: 2000 });
  }

  addNewDayClose() {
    this.router.navigate(['/organization/day-close/add']);
  }
}