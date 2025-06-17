import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from '../../../Services/department.service';

interface Department {
  id: number;
  name: string;
  code: string;
  departmentHeadId: number | null;
  departmentHeadName: string;
  description: string;
}

interface DepartmentResponse {
  result: {
    items: Department[];
    totalCount: number;
  };
  success: boolean;
  error: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

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
    MatMenuModule
  ],
  templateUrl: './organization-department.component.html',
  styleUrl: './organization-department.component.scss'
})
export class OrganizationDepartmentComponent implements OnInit {
  filterForm!: FormGroup;
  dataSource: MatTableDataSource<Department> = new MatTableDataSource<any>([]);
  totalCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Dropdown options
  departments: { id: number, name: string }[] = [];
  departmentHeads = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Michael Brown' },
    { id: 4, name: 'Emily Davis' }
  ];
  statuses = ['Active', 'Inactive', 'Pending Approval'];
  flags = ['Red', 'Yellow', 'Green'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDepartments();
  }

  initForm() {
    this.filterForm = this.fb.group({
      departmentName: [''],
      departmentHead: [''],
      status: [''],
      flag: ['']
    });
  }

  fetchDepartments() {
    this.isLoading = true;
    this.errorMessage = null;

    const params = this.buildParams();

    this.departmentService.getAll(params).subscribe({
      next: (response: DepartmentResponse) => {
        if (response.success) {
          this.departments = response.result.items.map(dept => ({
            id: dept.id,
            name: dept.name
          }));
          this.dataSource.data = response.result.items;
          this.totalCount = response.result.totalCount;
          this.isLoading = false;
          this.snackBar.open('Departments loaded successfully', 'Close', { duration: 2000 });
        } else {
          this.isLoading = false;
          this.errorMessage = 'API returned an unsuccessful response.';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load departments. Please try again.';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        console.error('Error fetching departments:', error);
      }
    });
  }

  applyFilters() {
    this.pageIndex = 0; // Reset to first page
    this.fetchDepartments();
  }

  clearFilters() {
    this.filterForm.reset();
    this.pageIndex = 0;
    this.fetchDepartments();
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  buildParams() {
    const formValues = this.filterForm.value;
    const params: any = {
      SkipCount: this.pageIndex * this.pageSize,
      MaxResultCount: this.pageSize
    };

    if (formValues.departmentName) {
      params.Name = formValues.departmentName; // Use 'Name' to filter by department ID
    }

    if (formValues.departmentHead) {
      params.DepartmentHeadId = formValues.departmentHead;
    }

    if (formValues.status) {
      params.Status = formValues.status;
    }

    if (formValues.flag) {
      params.Flag = formValues.flag;
    }

    return params;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchDepartments();
  }

  viewDepartment(id: number): void {
    this.snackBar.open(`Viewing department ${id}`, 'Close', { duration: 2000 });
  }

  editDepartment(id: number) {
    this.router.navigate(['/organization/departments/edit', id]);
  }

  toggleDepartmentStatus(department: Department) {
    // Placeholder for API call to toggle status
    this.snackBar.open('Toggle status not implemented (API required)', 'Close', { duration: 2000 });
  }

  addNewDepartment() {
    this.router.navigate(['/organization/departments/add']);
  }

  downloadPDF() {
    this.snackBar.open('PDF download initiated', 'Close', { duration: 2000 });
  }
}