import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-organization-department',
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
  templateUrl: './organization-department.component.html',
  styleUrl: './organization-department.component.scss'
})
export class OrganizationDepartmentComponent {
  filterForm!: FormGroup;

  // Dropdown options
  departments = [
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Information Technology' },
    { id: 4, name: 'Operations' }
  ];

  departmentHeads = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Michael Brown' },
    { id: 4, name: 'Emily Davis' }
  ];

  statuses = ['Active', 'Inactive', 'Pending Approval'];
  flags = ['Red', 'Yellow', 'Green'];

  // Static department data
  departmentsData = [
    {
      id: 1,
      departmentName: 'Human Resources',
      departmentHead: 'John Smith',
      departmentCode: 'HR001',
      addedOn: new Date('2020-01-15'),
      modifiedOn: new Date('2023-05-10'),
      status: 'Active',
      isActive: true
    },
    {
      id: 2,
      departmentName: 'Finance',
      departmentHead: 'Sarah Johnson',
      departmentCode: 'FIN002',
      addedOn: new Date('2019-03-22'),
      modifiedOn: new Date('2023-04-15'),
      status: 'Active',
      isActive: true
    },
    {
      id: 3,
      departmentName: 'Information Technology',
      departmentHead: 'Michael Brown',
      departmentCode: 'IT003',
      addedOn: new Date('2021-07-10'),
      modifiedOn: new Date('2023-06-01'),
      status: 'Active',
      isActive: true
    },
    {
      id: 4,
      departmentName: 'Operations',
      departmentHead: 'Emily Davis',
      departmentCode: 'OPS004',
      addedOn: new Date('2022-02-18'),
      modifiedOn: new Date('2023-03-12'),
      status: 'Pending Approval',
      isActive: false
    }
  ];

  totalCount: number = this.departmentsData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.departmentsData);

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
    this.dataSource = new MatTableDataSource(this.departmentsData);
  }

  initForm() {
    this.filterForm = this.fb.group({
      departmentName: [''],
      departmentHead: [''],
      status: [''],
      flag: ['']
    });
  }

  applyFilters() {
    const formValues = this.filterForm.value;
    let filteredData = [...this.departmentsData];

    if (formValues.departmentName) {
      filteredData = filteredData.filter(dept => 
        dept.departmentName === this.departments.find(d => d.id === formValues.departmentName)?.name
      );
    }

    if (formValues.departmentHead) {
      filteredData = filteredData.filter(dept => 
        dept.departmentHead === this.departmentHeads.find(dh => dh.id === formValues.departmentHead)?.name
      );
    }

    if (formValues.status) {
      filteredData = filteredData.filter(dept => dept.status === formValues.status);
    }

    this.dataSource.data = filteredData;
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.dataSource.data = this.departmentsData;
    this.totalCount = this.departmentsData.length;
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewDepartment(id: number): void {
    const department = this.departmentsData.find(d => d.id === id);
    this.snackBar.open(`Viewing department ${id}`, 'Close', { duration: 2000 });
  }

  editDepartment(id: number) {
    this.router.navigate(['/organization/departments/edit', id]);
  }

  toggleDepartmentStatus(department: any) {
    department.isActive = !department.isActive;
    department.status = department.isActive ? 'Active' : 'Inactive';
    this.snackBar.open(`Status changed to ${department.isActive ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewDepartment() {
    this.router.navigate(['/organization/departments/add']);
  }

  downloadPDF() {
    this.snackBar.open('PDF download initiated', 'Close', { duration: 2000 });
  }
}