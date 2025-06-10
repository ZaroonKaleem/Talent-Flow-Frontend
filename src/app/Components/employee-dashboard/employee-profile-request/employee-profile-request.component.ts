import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { environment } from '../../../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../shared/loader.service';
import { EmployeeViewModalComponent } from '../employee-view-modal/employee-view-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../Services/employee.service';

interface Employee {
    id: number;
    name: string;
    department: string;
    designation: string;
    status: string;
}

@Component({
  selector: 'app-employee-profile-request',
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
  MatChipsModule, // Only need this once
  MatMenuModule,
  MatTooltipModule,
  MatCardModule, // Add this if using mat-card
  CommonModule,
  MatSelectModule,
  // Form Modules
  FormsModule,
  ReactiveFormsModule,
],
  templateUrl: './employee-profile-request.component.html',
  styleUrl: './employee-profile-request.component.scss'
})
export class EmployeeProfileRequestComponent implements OnInit{

        employees: any[] = [];

allowanceOptions: any[] = [];
announcementTypeOptions: any[] = [];
assetTypeOptions: any[] = [];
clientCustomerOptions: any[] = [];
costCenterOptions: any[] = [];
countryOptions: any[] = [];
deductionOptions: any[] = [];
designationOptions: any[] = [];
divisionOptions: any[] = [];
documentTypeOptions: any[] = [];
employeeOptions: any[] = [];
employeeBankOptions: any[] = [];
employeeGroupOptions: any[] = [];
employeePrefixOptions: any[] = [];
employeeStatusOptions: any[] = [];
employerBankOptions: any[] = [];
exitTypeOptions: any[] = [];
expenseUnitOptions: any[] = [];
floorOptions: any[] = [];
genderOptions: any[] = [];
glClassOptions: any[] = [];
gradeOptions: any[] = [];
jobOptions: any[] = [];
jobFieldOptions: any[] = [];
maritalStatusOptions: any[] = [];
regionOptions: any[] = [];
resignTypeOptions: any[] = [];
roomOptions: any[] = [];
univercityOptions: any[] = [];
announcementOptions: any[] = [];
areaOptions: any[] = [];
bankBranchOptions: any[] = [];
cityOptions: any[] = [];
dayCloseOptions: any[] = [];
departmentOptions: any[] = [];
employeeStationOptions: any[] = [];
gazettedHolidayOptions: any[] = [];
minimumWageOptions: any[] = [];
projectOptions: any[] = [];
provinceOptions: any[] = [];
subDepartmentOptions: any[] = [];
taskOptions: any[] = [];
vendorOptions: any[] = [];

//   fetchDropdownData() {
//     const accessToken = localStorage.getItem('accessToken');
  
//     if (!accessToken) {
//       console.error('Access token not found.');
//       return;
//     }
  
//     const headers = {
//       Authorization: `Bearer ${accessToken}`
//     };
  
//     const targets = [
//       'Allowance', 'AnnouncementType', 'AssetType', 'ClientCustomer', 'CostCenter',
//       'Country', 'Deduction', 'Designation', 'Division', 'DocumentType', 'Employee',
//       'EmployeeBank', 'EmployeeGroup', 'EmployeePrefix', 'EmployeeStatus', 'EmployerBank',
//       'ExitType', 'ExpenseUnit', 'Floor', 'Gender', 'GLClass', 'Grade', 'Job', 'JobField',
//       'MaritalStatus', 'Region', 'ResignType', 'Room', 'Univercity', 'Announcement',
//       'Area', 'BankBranch', 'City', 'DayClose', 'Department', 'EmployeeStation',
//       'GazettedHoliday', 'MinimumWage', 'Project', 'Province', 'SubDepartment', 'Task', 'Vendor'
//     ];
  
//     const params = {
//       Targets: targets.join(','),
//     };
  
//     this.http.get<any>(`${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`, {
//       headers,
//       params
//     }).subscribe({
//       next: (response) => {
//         const result = response?.result || [];
  
//         this.allowanceOptions = result.find((r: any) => r.target === 'Allowance')?.data?.items || [];
//         this.announcementTypeOptions = result.find((r: any) => r.target === 'AnnouncementType')?.data?.items || [];
//         this.assetTypeOptions = result.find((r: any) => r.target === 'AssetType')?.data?.items || [];
//         this.clientCustomerOptions = result.find((r: any) => r.target === 'ClientCustomer')?.data?.items || [];
//         this.costCenterOptions = result.find((r: any) => r.target === 'CostCenter')?.data?.items || [];
//         this.countryOptions = result.find((r: any) => r.target === 'Country')?.data?.items || [];
//         this.deductionOptions = result.find((r: any) => r.target === 'Deduction')?.data?.items || [];
//         this.designationOptions = result.find((r: any) => r.target === 'Designation')?.data?.items || [];
//         this.divisionOptions = result.find((r: any) => r.target === 'Division')?.data?.items || [];
//         this.documentTypeOptions = result.find((r: any) => r.target === 'DocumentType')?.data?.items || [];
//         this.employeeOptions = result.find((r: any) => r.target === 'Employee')?.data?.items || [];
//         this.employeeBankOptions = result.find((r: any) => r.target === 'EmployeeBank')?.data?.items || [];
//         this.employeeGroupOptions = result.find((r: any) => r.target === 'EmployeeGroup')?.data?.items || [];
//         this.employeePrefixOptions = result.find((r: any) => r.target === 'EmployeePrefix')?.data?.items || [];
//         this.employeeStatusOptions = result.find((r: any) => r.target === 'EmployeeStatus')?.data?.items || [];
//         this.employerBankOptions = result.find((r: any) => r.target === 'EmployerBank')?.data?.items || [];
//         this.exitTypeOptions = result.find((r: any) => r.target === 'ExitType')?.data?.items || [];
//         this.expenseUnitOptions = result.find((r: any) => r.target === 'ExpenseUnit')?.data?.items || [];
//         this.floorOptions = result.find((r: any) => r.target === 'Floor')?.data?.items || [];
//         this.genderOptions = result.find((r: any) => r.target === 'Gender')?.data?.items || [];
//         this.glClassOptions = result.find((r: any) => r.target === 'GLClass')?.data?.items || [];
//         this.gradeOptions = result.find((r: any) => r.target === 'Grade')?.data?.items || [];
//         this.jobOptions = result.find((r: any) => r.target === 'Job')?.data?.items || [];
//         this.jobFieldOptions = result.find((r: any) => r.target === 'JobField')?.data?.items || [];
//         this.maritalStatusOptions = result.find((r: any) => r.target === 'MaritalStatus')?.data?.items || [];
//         this.regionOptions = result.find((r: any) => r.target === 'Region')?.data?.items || [];
//         this.resignTypeOptions = result.find((r: any) => r.target === 'ResignType')?.data?.items || [];
//         this.roomOptions = result.find((r: any) => r.target === 'Room')?.data?.items || [];
//         this.univercityOptions = result.find((r: any) => r.target === 'Univercity')?.data?.items || [];
//         this.announcementOptions = result.find((r: any) => r.target === 'Announcement')?.data?.items || [];
//         this.areaOptions = result.find((r: any) => r.target === 'Area')?.data?.items || [];
//         this.bankBranchOptions = result.find((r: any) => r.target === 'BankBranch')?.data?.items || [];
//         this.cityOptions = result.find((r: any) => r.target === 'City')?.data?.items || [];
//         this.dayCloseOptions = result.find((r: any) => r.target === 'DayClose')?.data?.items || [];
//         this.departmentOptions = result.find((r: any) => r.target === 'Department')?.data?.items || [];
//         this.employeeStationOptions = result.find((r: any) => r.target === 'EmployeeStation')?.data?.items || [];
//         this.gazettedHolidayOptions = result.find((r: any) => r.target === 'GazettedHoliday')?.data?.items || [];
//         this.minimumWageOptions = result.find((r: any) => r.target === 'MinimumWage')?.data?.items || [];
//         this.projectOptions = result.find((r: any) => r.target === 'Project')?.data?.items || [];
//         this.provinceOptions = result.find((r: any) => r.target === 'Province')?.data?.items || [];
//         this.subDepartmentOptions = result.find((r: any) => r.target === 'SubDepartment')?.data?.items || [];
//         this.taskOptions = result.find((r: any) => r.target === 'Task')?.data?.items || [];
//         this.vendorOptions = result.find((r: any) => r.target === 'Vendor')?.data?.items || [];
  
//         console.log('All dropdown data loaded successfully');
//       },
//       error: (err) => {
//         console.error('Dropdown data fetch failed:', err);
//       }
//     });
//   }
fetchDropdownData() {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.error('Access token not found.');
    return;
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  const targets = [
    'Allowance', 'AnnouncementType', 'AssetType', 'ClientCustomer', 'CostCenter',
    'Country', 'Deduction', 'Designation', 'Division', 'DocumentType', 'Employee',
    'EmployeeBank', 'EmployeeGroup', 'EmployeePrefix', 'EmployeeStatus', 'EmployerBank',
    'ExitType', 'ExpenseUnit', 'Floor', 'Gender', 'GLClass', 'Grade', 'Job', 'JobField',
    'MaritalStatus', 'Region', 'ResignType', 'Room', 'Univercity', 'Announcement',
    'Area', 'BankBranch', 'City', 'DayClose', 'Department', 'EmployeeStation',
    'GazettedHoliday', 'MinimumWage', 'Project', 'Province', 'SubDepartment', 'Task', 'Vendor'
  ];

  const params = {
    Targets: targets.join(','),
  };

  this.loaderService.show(); // 🔵 Show loader before request

  this.http.get<any>(`${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`, {
    headers,
    params
  }).subscribe({
    next: (response) => {
      const result = response?.result || [];

      this.allowanceOptions = result.find((r: any) => r.target === 'Allowance')?.data?.items || [];
      this.announcementTypeOptions = result.find((r: any) => r.target === 'AnnouncementType')?.data?.items || [];
      this.assetTypeOptions = result.find((r: any) => r.target === 'AssetType')?.data?.items || [];
      this.clientCustomerOptions = result.find((r: any) => r.target === 'ClientCustomer')?.data?.items || [];
      this.costCenterOptions = result.find((r: any) => r.target === 'CostCenter')?.data?.items || [];
      this.countryOptions = result.find((r: any) => r.target === 'Country')?.data?.items || [];
      this.deductionOptions = result.find((r: any) => r.target === 'Deduction')?.data?.items || [];
      this.designationOptions = result.find((r: any) => r.target === 'Designation')?.data?.items || [];
      this.divisionOptions = result.find((r: any) => r.target === 'Division')?.data?.items || [];
      this.documentTypeOptions = result.find((r: any) => r.target === 'DocumentType')?.data?.items || [];
      this.employeeOptions = result.find((r: any) => r.target === 'Employee')?.data?.items || [];
      this.employeeBankOptions = result.find((r: any) => r.target === 'EmployeeBank')?.data?.items || [];
      this.employeeGroupOptions = result.find((r: any) => r.target === 'EmployeeGroup')?.data?.items || [];
      this.employeePrefixOptions = result.find((r: any) => r.target === 'EmployeePrefix')?.data?.items || [];
      this.employeeStatusOptions = result.find((r: any) => r.target === 'EmployeeStatus')?.data?.items || [];
      this.employerBankOptions = result.find((r: any) => r.target === 'EmployerBank')?.data?.items || [];
      this.exitTypeOptions = result.find((r: any) => r.target === 'ExitType')?.data?.items || [];
      this.expenseUnitOptions = result.find((r: any) => r.target === 'ExpenseUnit')?.data?.items || [];
      this.floorOptions = result.find((r: any) => r.target === 'Floor')?.data?.items || [];
      this.genderOptions = result.find((r: any) => r.target === 'Gender')?.data?.items || [];
      this.glClassOptions = result.find((r: any) => r.target === 'GLClass')?.data?.items || [];
      this.gradeOptions = result.find((r: any) => r.target === 'Grade')?.data?.items || [];
      this.jobOptions = result.find((r: any) => r.target === 'Job')?.data?.items || [];
      this.jobFieldOptions = result.find((r: any) => r.target === 'JobField')?.data?.items || [];
      this.maritalStatusOptions = result.find((r: any) => r.target === 'MaritalStatus')?.data?.items || [];
      this.regionOptions = result.find((r: any) => r.target === 'Region')?.data?.items || [];
      this.resignTypeOptions = result.find((r: any) => r.target === 'ResignType')?.data?.items || [];
      this.roomOptions = result.find((r: any) => r.target === 'Room')?.data?.items || [];
      this.univercityOptions = result.find((r: any) => r.target === 'Univercity')?.data?.items || [];
      this.announcementOptions = result.find((r: any) => r.target === 'Announcement')?.data?.items || [];
      this.areaOptions = result.find((r: any) => r.target === 'Area')?.data?.items || [];
      this.bankBranchOptions = result.find((r: any) => r.target === 'BankBranch')?.data?.items || [];
      this.cityOptions = result.find((r: any) => r.target === 'City')?.data?.items || [];
      this.dayCloseOptions = result.find((r: any) => r.target === 'DayClose')?.data?.items || [];
      this.departmentOptions = result.find((r: any) => r.target === 'Department')?.data?.items || [];
      this.employeeStationOptions = result.find((r: any) => r.target === 'EmployeeStation')?.data?.items || [];
      this.gazettedHolidayOptions = result.find((r: any) => r.target === 'GazettedHoliday')?.data?.items || [];
      this.minimumWageOptions = result.find((r: any) => r.target === 'MinimumWage')?.data?.items || [];
      this.projectOptions = result.find((r: any) => r.target === 'Project')?.data?.items || [];
      this.provinceOptions = result.find((r: any) => r.target === 'Province')?.data?.items || [];
      this.subDepartmentOptions = result.find((r: any) => r.target === 'SubDepartment')?.data?.items || [];
      this.taskOptions = result.find((r: any) => r.target === 'Task')?.data?.items || [];
      this.vendorOptions = result.find((r: any) => r.target === 'Vendor')?.data?.items || [];

      console.log('All dropdown data loaded successfully');
      this.loaderService.hide(); // ✅ Hide loader on success
    },
    error: (err) => {
      console.error('Dropdown data fetch failed:', err);
      this.loaderService.hide(); // ❌ Hide loader on error too
    }
  });
}

 filterForm!: FormGroup;
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

    // Sample data for dropdowns
    divisions = ['North', 'South', 'East', 'West'];
    managers = ['John Doe', 'Jane Smith', 'Mike Johnson'];

      totalCount: number = 0;
        pageSize: number = 10; // or whatever default you want
        pageIndex: number = 0;
    
        @ViewChild(MatSort) sort!: MatSort;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private fb: FormBuilder, 
        private http: HttpClient,
        private loaderService: LoaderService,
        private dialog: MatDialog,
        private router: Router,
        private employeeService: EmployeeService
    ) {
        this.initForm();
        this.loadSampleData();
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

    ngOnInit(): void {
          this.fetchDropdownData();
          this.loadEmployees();

    }

    addNewEmployee() {
    // Your implementation for adding a new employee
    this.router.navigate(['/employee-dashboard/employee/add']);
}

   initForm() {
    this.filterForm = this.fb.group({
        station: [''],
        status: [''],
        department: [''],
        subDepartment: [''],
        employeeGroup: [''],
        designation: [''],
        division: [''],
        employeeCode: [''],
        employeeName: [''],
        username: [''],
        employeeStatus: [''],
        documentsAttached: [''],
        rolesTemplate: [''],
        cnic: [''],
        flag: [''],
        reportsTo: [''],
        listStatus: [''],
        action: [''],
    });
}

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

    // ... (keep your existing download methods)

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

    // Download Table as Excel
    downloadExcel() {
        // Get the table element
        const table = document.getElementById('my-table') as HTMLTableElement;

        // Create a new workbook
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();

        // Convert the HTML table to a worksheet
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');

        // Generate and download the Excel file
        XLSX.writeFile(workbook, 'table-data.xlsx');
    }

    // Download Table as Print
    printTableInNewWindow() {
        // Get the table HTML
        const tableHtml = document.getElementById('my-table')!.outerHTML;

        // Open a new window
        const printWindow = window.open('', '', 'width=800,height=600');

        // Ensure the new window was successfully opened
        if (printWindow) {
            // Create the content of the new window
            const content = `
                    <html>
                        <head>
                        <title>Print Table</title>
                            <style>
                                table {
                                    width: 100%;
                                    border-collapse: collapse;
                                }
                                th, td {
                                    padding: 8px;
                                    text-align: left;
                                    border: 1px solid black;
                                }
                                @media print {
                                    body {
                                        font-size: 12px;
                                        margin: 0;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            ${tableHtml}
                        </body>
                    </html>
                `;

            // Write the content into the new window
            printWindow.document.open();
            printWindow.document.write(content);
            printWindow.document.close();

            // Add an event listener to print and close the window after printing
            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
                printWindow.onafterprint = () => {
                    printWindow.close();
                };
            };
        }
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

}
