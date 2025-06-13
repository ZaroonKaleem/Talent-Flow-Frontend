import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatMenu,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './organization-day-close.component.html',
  styleUrl: './organization-day-close.component.scss'
})
export class OrganizationDayCloseComponent {
  filterForm!: FormGroup;

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

  // Sample data
  dayClosesData = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeCode: 'EMP001',
      department: 'Information Technology',
      station: 'Headquarters',
      dayCloseDate: new Date('2023-06-15'),
      addedOn: new Date('2023-06-15'),
      payrollSetup: 'Monthly',
      employeeGroup: 'Technical Staff',
      flag: 'Green'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeCode: 'EMP002',
      department: 'Human Resources',
      station: 'Regional Office East',
      dayCloseDate: new Date('2023-06-15'),
      addedOn: new Date('2023-06-15'),
      payrollSetup: 'Monthly',
      employeeGroup: 'Administrative Staff',
      flag: 'Yellow'
    },
    {
      id: 3,
      employeeName: 'Robert Johnson',
      employeeCode: 'EMP003',
      department: 'Finance',
      subDepartment: '',
      station: 'Field Office North',
      dayCloseDate: new Date('2023-06-14'),
      addedOn: new Date('2023-06-14'),
      payrollSetup: 'Bi-Weekly',
      employeeGroup: 'Administrative Staff',
      flag: 'Red'
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      employeeCode: 'EMP004',
      department: 'Operations',
      station: 'Field Office South',
      dayCloseDate: new Date('2023-06-14'),
      addedOn: new Date('2023-06-14'),
      payrollSetup: 'Weekly',
      employeeGroup: 'Contractual Staff',
      flag: 'Green'
    }
  ];

  totalCount: number = this.dayClosesData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.dayClosesData);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.dataSource = new MatTableDataSource(this.dayClosesData);
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

  applyFilters() {
    const formValues = this.filterForm.value;
    let filteredData = [...this.dayClosesData];

    if (formValues.station) {
      filteredData = filteredData.filter(dc => 
        dc.station === this.stations.find(s => s.id === formValues.station)?.name
      );
    }

    if (formValues.department) {
      filteredData = filteredData.filter(dc => 
        dc.department === this.departments.find(d => d.id === formValues.department)?.name
      );
    }

    if (formValues.subDepartment) {
      filteredData = filteredData.filter(dc => 
        dc.subDepartment === this.subDepartments.find(sd => sd.id === formValues.subDepartment)?.name
      );
    }

    if (formValues.employeeGroup) {
      filteredData = filteredData.filter(dc => 
        dc.employeeGroup === this.employeeGroups.find(g => g.id === formValues.employeeGroup)?.name
      );
    }

    if (formValues.payrollSetup) {
      filteredData = filteredData.filter(dc => 
        dc.payrollSetup === this.payrollSetups.find(p => p.id === formValues.payrollSetup)?.name
      );
    }

    if (formValues.employee) {
      filteredData = filteredData.filter(dc => 
        dc.employeeName === this.employees.find(e => e.id === formValues.employee)?.name
      );
    }

    if (formValues.flag) {
      filteredData = filteredData.filter(dc => 
        dc.flag === formValues.flag
      );
    }

    if (formValues.dayCloseDateFrom) {
      filteredData = filteredData.filter(dc => 
        new Date(dc.dayCloseDate) >= new Date(formValues.dayCloseDateFrom)
      );
    }

    if (formValues.dayCloseDateTo) {
      filteredData = filteredData.filter(dc => 
        new Date(dc.dayCloseDate) <= new Date(formValues.dayCloseDateTo)
      );
    }

    this.dataSource.data = filteredData;
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.dataSource.data = this.dayClosesData;
    this.totalCount = this.dayClosesData.length;
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewDayClose(id: number): void {
    const dayClose = this.dayClosesData.find(dc => dc.id === id);
    this.snackBar.open(`Viewing day close ${id}`, 'Close', { duration: 2000 });
  }

  editDayClose(id: number) {
    this.router.navigate(['/organization/day-close/edit', id]);
  }

  deleteDayClose(dayClose: any) {
    // Implement delete functionality
    this.snackBar.open(`Day close ${dayClose.id} deleted`, 'Close', { duration: 2000 });
  }

  addNewDayClose() {
    this.router.navigate(['/organization/day-close/add']);
  }
}