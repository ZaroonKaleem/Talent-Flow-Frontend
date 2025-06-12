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

@Component({
  selector: 'app-organization-geo-location',
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
    MatMenuModule
  ],
  templateUrl: './organization-geo-location.component.html',
  styleUrl: './organization-geo-location.component.scss'
})
export class OrganizationGeoLocationComponent {
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

  employees = [
    { id: 1, name: 'John Doe', code: 'EMP001' },
    { id: 2, name: 'Jane Smith', code: 'EMP002' },
    { id: 3, name: 'Robert Johnson', code: 'EMP003' },
    { id: 4, name: 'Emily Davis', code: 'EMP004' }
  ];

  flags = ['Red', 'Yellow', 'Green'];

  // Sample data
  restrictionsData = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeCode: 'EMP001',
      department: 'Information Technology',
      employeeGroup: 'Technical Staff',
      station: 'Headquarters',
      ipAddress: '192.168.1.100',
      mobileIp: '192.168.1.150',
      latitude: '33.6844',
      longitude: '73.0479',
      location: 'Headquarters Building, Floor 3',
      isActive: true,
      subDepartment: '',
      ipAddressMapped: true,
      flag: 'Green'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeCode: 'EMP002',
      department: 'Human Resources',
      employeeGroup: 'Administrative Staff',
      station: 'Regional Office East',
      ipAddress: '192.168.2.100',
      mobileIp: '192.168.2.150',
      latitude: '33.6844',
      longitude: '73.0479',
      location: 'Regional Office East, HR Department',
      isActive: true,
            subDepartments: '',
      ipAddressMapped: true,
      flag: 'Yellow'
    },
    {
      id: 3,
      employeeName: 'Robert Johnson',
      employeeCode: 'EMP003',
      department: 'Finance',
      employeeGroup: 'Administrative Staff',
      station: 'Field Office North',
      ipAddress: '192.168.3.100',
      mobileIp: '192.168.3.150',
      latitude: '33.6844',
      longitude: '73.0479',
      location: 'Field Office North, Finance Wing',
      isActive: false,
            subDepartments: '',
      ipAddressMapped: false,
      flag: 'Red'
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      employeeCode: 'EMP004',
      department: 'Operations',
      employeeGroup: 'Contractual Staff',
      station: 'Field Office South',
      ipAddress: '192.168.4.100',
      mobileIp: '192.168.4.150',
      latitude: '33.6844',
      longitude: '73.0479',
      location: 'Field Office South, Operations Room',
      isActive: true,
            subDepartments: '',
      ipAddressMapped: true,
      flag: 'Green'
    }
  ];

  totalCount: number = this.restrictionsData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.restrictionsData);

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
    this.dataSource = new MatTableDataSource(this.restrictionsData);
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      department: [''],
      subDepartment: [''],
      employeeGroup: [''],
      employee: [''],
      employeeCode: [''],
      ipAddress: [''],
      ipAddressMapped: [''],
      flag: ['']
    });
  }

  applyFilters() {
    const formValues = this.filterForm.value;
    let filteredData = [...this.restrictionsData];

    if (formValues.station) {
      filteredData = filteredData.filter(res => 
        res.station === this.stations.find(s => s.id === formValues.station)?.name
      );
    }

    if (formValues.department) {
      filteredData = filteredData.filter(res => 
        res.department === this.departments.find(d => d.id === formValues.department)?.name
      );
    }

    if (formValues.subDepartment) {
      filteredData = filteredData.filter(res => 
        res.subDepartment === this.subDepartments.find(sd => sd.id === formValues.subDepartment)?.name
      );
    }

    if (formValues.employeeGroup) {
      filteredData = filteredData.filter(res => 
        res.employeeGroup === this.employeeGroups.find(g => g.id === formValues.employeeGroup)?.name
      );
    }

    if (formValues.employee) {
      filteredData = filteredData.filter(res => 
        res.employeeName === this.employees.find(e => e.id === formValues.employee)?.name
      );
    }

    if (formValues.employeeCode) {
      filteredData = filteredData.filter(res => 
        res.employeeCode.toLowerCase().includes(formValues.employeeCode.toLowerCase())
      );
    }

    if (formValues.ipAddress) {
      filteredData = filteredData.filter(res => 
        res.ipAddress.includes(formValues.ipAddress)
      );
    }

    if (formValues.ipAddressMapped) {
      const isMapped = formValues.ipAddressMapped === 'true';
      filteredData = filteredData.filter(res => 
        res.ipAddressMapped === isMapped
      );
    }

    if (formValues.flag) {
      filteredData = filteredData.filter(res => 
        res.flag === formValues.flag
      );
    }

    this.dataSource.data = filteredData;
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.dataSource.data = this.restrictionsData;
    this.totalCount = this.restrictionsData.length;
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewRestriction(id: number): void {
    const restriction = this.restrictionsData.find(r => r.id === id);
    this.snackBar.open(`Viewing restriction ${id}`, 'Close', { duration: 2000 });
  }

  editRestriction(id: number) {
    this.router.navigate(['/organization/geo-restrictions/edit', id]);
  }

  toggleRestrictionStatus(restriction: any) {
    restriction.isActive = !restriction.isActive;
    this.snackBar.open(`Status changed to ${restriction.isActive ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewRestriction() {
    this.router.navigate(['/organization/geo-restrictions/add']);
  }

  showLocationDetails(restriction: any) {
    const message = `Location Details:
    Address: ${restriction.location}
    Coordinates: ${restriction.latitude}, ${restriction.longitude}
    IP: ${restriction.ipAddress}
    Mobile IP: ${restriction.mobileIp}`;
    
    this.snackBar.open(message, 'Close', { duration: 10000, panelClass: ['location-snackbar'] });
  }
}