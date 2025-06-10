import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.dev';
import { LoaderService } from '../../../shared/loader.service';
import { EmployeeService } from '../../../Services/employee.service';
import { Router } from '@angular/router';
import { RouterConfigOptions } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeViewModalComponent } from '../employee-view-modal/employee-view-modal.component';
import jsPDF from 'jspdf';

interface Employee {
    id: number;
    name: string;
    department: string;
    designation: string;
    status: string;
}

@Component({
  selector: 'app-employee-transfer-request',
  standalone: true,
  imports: [
    // Angular Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    CommonModule,
    MatSelectModule,
    // Form Modules
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-transfer-request.component.html',
  styleUrl: './employee-transfer-request.component.scss'
})
export class EmployeeTransferRequestComponent implements OnInit {

  employees: any[] = [];
  
  displayedColumns: string[] = [
    'id',
    'station',
    'action',
    'name',
    'department',
    'designation',
    'status',
    'actions',
  ];

  dataSource!: MatTableDataSource<Employee>;

  filterForm!: FormGroup;
  
  // Dropdown options from API
  employeeStationOptions: any[] = [];
  departmentOptions: any[] = [];
  subDepartmentOptions: any[] = [];
  employeeGroupOptions: any[] = [];
  employeeOptions: any[] = [];

  // Static dropdown options
  years = [2023, 2024, 2025];
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  actions = ['Approve', 'Reject', 'Pending', 'Review'];
  requestTypes = ['Permanent', 'Temporary', 'Lateral'];
  transferTypes = ['Department', 'Station', 'Both'];
  
      totalCount: number = 0;
    pageSize: number = 10; // or whatever default you want
    pageIndex: number = 0;

      @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private loaderService: LoaderService,
    private employeeService: EmployeeService,
    private router:Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDropdownData();
    this.loadEmployees()
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      department: [''],
      subDepartment: [''],
      employeeGroup: [''],
      employee: [''],
      year: [''],
      month: [''],
      action: [''],
      requestType: [''],
      type: [''],
      flag: ['']
    });
  }

  fetchDropdownData() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('Access token not found.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    // Only request the targets we need for this component
    const targets = [
      'EmployeeStation',
      'Department',
      'SubDepartment',
      'EmployeeGroup',
      'Employee'
    ];

    const params = {
      Targets: targets.join(','),
    };

    this.http.get<any>(`${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`, {
      headers,
      params
    }).subscribe({
      next: (response) => {
        const result = response?.result || [];

        this.employeeStationOptions = result.find((r: any) => r.target === 'EmployeeStation')?.data?.items || [];
        this.departmentOptions = result.find((r: any) => r.target === 'Department')?.data?.items || [];
        this.subDepartmentOptions = result.find((r: any) => r.target === 'SubDepartment')?.data?.items || [];
        this.employeeGroupOptions = result.find((r: any) => r.target === 'EmployeeGroup')?.data?.items || [];
        this.employeeOptions = result.find((r: any) => r.target === 'Employee')?.data?.items || [];

        console.log('Dropdown data loaded successfully');
      },
      error: (err) => {
        console.error('Dropdown data fetch failed:', err);
      }
    });
  }

   loadEmployees(): void {
          this.loaderService.show(); // Show loader before API call
  
          this.employeeService.getAllEmployees().subscribe({
              next: (response) => {
                  this.employees = response.result.items;
                  console.log('response i got: ', response);
                  this.loaderService.hide(); // Hide loader after success
              },
              error: (error) => {
                  console.error('Error loading employees', error);
                  this.loaderService.hide(); // Hide loader even on error
              },
          });
    }
  
      onPageChange(event: PageEvent): void {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
  
          // Re-fetch data with new pagination values
          this.loadEmployees();
      }

       rehireEmployee() {}
      
          addNewEmployee() {}
      
          sendCredentials() {}
      
          uploadExcel() {}
      
          loadFallbackData() {}
      
              loadSampleData() {
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
    }
      
          applyFilter() {
              const { employeeName, employeeCode, department, designation } =
                  this.filterForm.value;
              this.dataSource.filterPredicate = (data: Employee, filter: string) => {
                  const searchTerms = JSON.parse(filter);
                  return (
                      (!searchTerms.employeeName ||
                          data.name
                              .toLowerCase()
                              .includes(searchTerms.employeeName.toLowerCase())) &&
                      (!searchTerms.employeeCode ||
                          data.id.toString().includes(searchTerms.employeeCode)) &&
                      (!searchTerms.department ||
                          data.department === searchTerms.department) &&
                      (!searchTerms.designation ||
                          data.designation === searchTerms.designation)
                  );
              };
      
              this.dataSource.filter = JSON.stringify(this.filterForm.value);
          }
      
          clearFilters() {
              this.filterForm.reset();
              this.loadSampleData();
          }

  applyFilters() {
    const filters = this.filterForm.value;
    console.log('Applied Filters:', filters);
    // Implement your filter logic here
    // Typically you would call a service to get filtered data
  }
  viewEmployee(id: number): void {
    const employee = this.employees.find(e => e.id === id);
    this.dialog.open(EmployeeViewModalComponent, {
      width: '600px',
      data: employee
    });
  }
  
  editEmployee(id:string) {
    this.router.navigate(['/employee-dashboard/employees/edit', id]);
  }
  
  
      showAdditionalInfo(id: number) {
          // Show additional information dialog/modal
          console.log('Show additional info for employee:', id);
      }
  
      toggleEmployeeStatus(employee: any) {
          // Toggle employee active status
          //   this.employeeService.toggleEmployeeStatus(employee.id, !employee.isActive)
          //     .subscribe({
          //       next: () => {
          //         employee.isActive = !employee.isActive;
          //       },
          //       error: (err) => {
          //         console.error('Error toggling employee status', err);
          //       }
          //     });
      }
  
      blacklistEmployee(id: number) {
          // Blacklist employee
          //   this.employeeService.blacklistEmployee(id)
          //     .subscribe({
          //       next: () => {
          //         // Handle success
          //       },
          //       error: (err) => {
          //         console.error('Error blacklisting employee', err);
          //       }
          //     });
      }

          // Download Table as PDF
          downloadPDF() {
              const doc = new jsPDF();
      
              // Get the table element by ID (or querySelector)
              const table = document.getElementById('my-table');
      
              // Add title or any additional text to the PDF
              doc.text('Static Table Data', 20, 10);
      
              // Use jsPDF-AutoTable to convert the HTML table to PDF
              (doc as any).autoTable({
                  html: '#my-table', // This will automatically extract the table structure from HTML
                  startY: 20, // Optional: set where the table should start
              });
      
              // Save the generated PDF
              doc.save('static-table-data.pdf');
          }
      
          // Download Table as CSV
          downloadCSV() {
              const table = document.getElementById('my-table') as HTMLTableElement;
              let csv = '';
      
              // Loop through table rows (thead and tbody)
              for (let i = 0; i < table.rows.length; i++) {
                  const row = table.rows[i];
                  const cells = row.cells;
                  const rowData = [];
      
                  // Loop through each cell in the row and format the data
                  for (let j = 0; j < cells.length; j++) {
                      rowData.push(cells[j].innerText);
                  }
      
                  // Join the data as a comma-separated string and add to CSV
                  csv += rowData.join(',') + '\n';
              }
      
              // Create a Blob object with the CSV content and trigger a download
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'table-data.csv';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
          }
}