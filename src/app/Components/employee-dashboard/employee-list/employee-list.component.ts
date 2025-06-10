import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatPaginator,
    MatPaginatorModule,
    PageEvent,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { environment } from '../../../../environments/environment.dev';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, distinctUntilChanged, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader.service';
import { EmployeeService } from '../../../Services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeViewModalComponent } from '../employee-view-modal/employee-view-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Employee {
  id: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  surname: string;
  userName: string;
  isEmployee: boolean;
  accountNumber: string;
  accountTitle: string;
  address: string;
  branchCode: string;
  cnic: string;
  employeeCode: string;
  employeeStationId: number;
  employeeStationName: string;
  departmentId: number;
  departmentName: string;
  subDepartmentId: number;
  subDepartmentName: string;
  employeeGroupId: number;
  employeeGroupName: string;
  designationId: number;
  designationName: string;
  divisionId: number;
  divisionName: string;
  employeeStatusId: number;
  employeeStatusName: string;
  genderId: number;
  genderName: string;
  gradeId: number;
  gradeName: string;
  joiningDate: string | Date;
  isActive: boolean;
  modifiedDate: string | Date;
  roleTemplate: string;
   mobileNo?: string;
    passport?: string;
    dateOfBirth?: Date;
    maritalStatusName?: string;
    maritalStatusId?: number;
    placeOfBirth?: string;
    familyCode?: string;
    religionId?: number;
    state?: string;
    zipCode?: string;
    emergencyContactPerson?: string;
    emergencyRelationship?: string;
    emergencyContactPhone?: string;
    cnicIssuanceDate?: Date;
    cnicExpiryDate?: Date;
    eobiRegistrationNo?: string;
    eobiEntryDate?: Date;
    socialSecurityNumber?: string;
    visa?: string;
    visaExpiryDate?: Date;
    confirmationDate?: Date;
    employeePositionName?: string;
    employeeBankName?: string;
relationship?: string;
mobilePhone?:string;
  // Add other properties as needed from your API response
}

export interface EmployeeListResult {
  totalCount: number;
  items: Employee[];
}

export interface EmployeeListResponse {
  result: EmployeeListResult;
  targetUrl: string | null;
  success: boolean;
  error: any;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
// export interface EmployeeListResponse {
// //   items: Employee[];
// //   totalCount: number;
//   result: {
//     items: Employee[];         // You can replace `any` with `Employee` if you have a proper model
//     totalCount: number;
//   };
// }

interface SuggestionItem {
    id: string;
    name: string;
    additional: any;
}

interface SuggestionResult {
    target: string;
    data: {
        totalCount: number;
        items: SuggestionItem[];
    };
}

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [
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
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
    employees: Employee[] = [];
    filterForm!: FormGroup;
    dataSource!: MatTableDataSource<Employee>;

    // Dropdown options
    employeeStationOptions: any[] = [];
    departmentOptions: any[] = [];
    subDepartmentOptions: any[] = [];
    employeeGroupOptions: any[] = [];
    designationOptions: any[] = [];
    divisionOptions: any[] = [];
    employeeStatusOptions: any[] = [];
    // Add other dropdown options as needed

    totalCount: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private http: HttpClient,
        private store: Store,
        private loaderService: LoaderService,
        private employeeService: EmployeeService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.initForm();
    }

    ngOnInit(): void {
        this.fetchDropdownData();
        this.loadEmployees();
        this.setupFilterDebounce();
    }

    initForm() {
        this.filterForm = this.fb.group({
            station: [null as number | null],
            department: [null as number | null],
            subDepartment: [null as number | null],
            employeeGroup: [null as number | null],
            designation: [null as number | null],
            division: [null as number | null],
            employeeCode: [''],
            employeeName: [''],
            username: [''],
            employeeStatus: [null as number | null],
            documentsAttached: [null as boolean | null],
            cnic: [''],
            flag: [''],
            listStatus: ['']
        });
    }

    setupFilterDebounce() {
        this.filterForm.get('employeeName')?.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => {
                if (value) this.applyFilter();
            });

        this.filterForm.get('employeeCode')?.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => {
                if (value) this.applyFilter();
            });

        this.filterForm.get('cnic')?.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(value => {
                if (value) this.applyFilter();
            });
    }

    fetchDropdownData() {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found.');
            return;
        }

        const headers = { Authorization: `Bearer ${accessToken}` };
        const targets = [
            'Department',
            'SubDepartment',
            'EmployeeGroup',
            'Designation',
            'Division',
            'EmployeeStatus',
            'EmployeeStation'
            // Add other targets as needed
        ];

        this.loaderService.show();
        this.http.get<any>(
            `${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`,
            { headers, params: { Targets: targets.join(',') } }
        ).subscribe({
            next: (response) => {
                const result = response?.result || [];
                const dropdownMap: Record<string, string> = {
                    'Department': 'departmentOptions',
                    'SubDepartment': 'subDepartmentOptions',
                    'EmployeeGroup': 'employeeGroupOptions',
                    'Designation': 'designationOptions',
                    'Division': 'divisionOptions',
                    'EmployeeStatus': 'employeeStatusOptions',
                    'EmployeeStation': 'employeeStationOptions'
                };

                for (const target in dropdownMap) {
                    const data = result.find((r: any) => r.target === target)?.data?.items || [];
                    (this as any)[dropdownMap[target]] = data;
                }
                this.loaderService.hide();
            },
            error: (error) => {
                console.error('Error fetching dropdown data', error);
                this.loaderService.hide();
                this.snackBar.open('Error loading dropdown options', 'Close', { duration: 3000 });
            }
        });
    }

// loadEmployees(): void {
//     this.loaderService.show();
//     const params = {
//         SkipCount: this.pageIndex * this.pageSize,
//         MaxResultCount: this.pageSize
//     };

//     this.employeeService.getAllEmployees(params).subscribe({
//         next: (response: any) => {
//             // Make sure to access the 'result' property from the response
//             const employeeResponse = response.result as EmployeeListResponse;
//             this.employees = employeeResponse.result.items;
//             this.totalCount = employeeResponse.result.totalCount;
//             this.dataSource = new MatTableDataSource(this.employees);
            
//             // Initialize paginator after data is loaded
//             if (this.paginator) {
//                 this.paginator.length = this.totalCount;
//                 this.dataSource.paginator = this.paginator;
//             }
            
//             // Initialize sort if needed
//             if (this.sort) {
//                 this.dataSource.sort = this.sort;
//             }
            
//             this.loaderService.hide();
//         },
//         error: (error) => {
//             console.error('Error loading employees', error);
//             this.loaderService.hide();
//             this.snackBar.open('Error loading employees', 'Close', { duration: 3000 });
//         }
//     });
// }
    // applyFilter(): void {
    //     this.loaderService.show();
    //     this.pageIndex = 0;

    //     const formValues = this.filterForm.value;
    //     const params: any = {
    //         SkipCount: this.pageIndex * this.pageSize,
    //         MaxResultCount: this.pageSize
    //     };

    //     // Map form controls to API parameters
    //     if (formValues.station) params.EmployeeStationId = formValues.station;
    //     if (formValues.department) params.DepartmentId = formValues.department;
    //     if (formValues.subDepartment) params.SubDepartmentId = formValues.subDepartment;
    //     if (formValues.employeeGroup) params.EmployeeGroupId = formValues.employeeGroup;
    //     if (formValues.designation) params.DesignationId = formValues.designation;
    //     if (formValues.division) params.DivisionId = formValues.division;
    //     if (formValues.employeeCode) params.Id = formValues.employeeCode;
    //     if (formValues.employeeName) params.Name = formValues.employeeName;
    //     if (formValues.username) params.UserName = formValues.username;
    //     if (formValues.employeeStatus) params.EmployeeStatusId = formValues.employeeStatus;
    //     if (formValues.cnic) params.Cnic = formValues.cnic;
        
    //     if (formValues.documentsAttached !== null) {
    //         params.HasDocuments = formValues.documentsAttached;
    //     }
        
    //     if (formValues.listStatus === 'blacklist') {
    //         params.IsBlacklisted = true;
    //     } else if (formValues.listStatus === 'whitelist') {
    //         params.IsWhitelisted = true;
    //     }

    //     this.employeeService.getAllEmployees(params).subscribe({
    //         next: (response: EmployeeListResponse) => {
    //             this.employees = response.items;
    //             this.totalCount = response.totalCount;
    //             this.dataSource = new MatTableDataSource(this.employees);
    //             this.loaderService.hide();
    //         },
    //         error: (error) => {
    //             console.error('Error filtering employees', error);
    //             this.loaderService.hide();
    //             this.snackBar.open('Error applying filters', 'Close', { duration: 3000 });
    //         }
    //     });
    // }

    loadEmployees(): void {
    this.loaderService.show();
    const params = {
        SkipCount: this.pageIndex * this.pageSize,
        MaxResultCount: this.pageSize
    };

    this.employeeService.getAllEmployees(params).subscribe({
        next: (response: any) => {
            const employeeResult = response.result;
            this.employees = employeeResult.items;
            this.totalCount = employeeResult.totalCount;
            this.dataSource = new MatTableDataSource(this.employees);
            
            if (this.paginator) {
                this.paginator.length = this.totalCount;
                this.dataSource.paginator = this.paginator;
            }
            
            if (this.sort) {
                this.dataSource.sort = this.sort;
            }

            this.loaderService.hide();
        },
        error: (error) => {
            console.error('Error loading employees', error);
            this.loaderService.hide();
            this.snackBar.open('Error loading employees', 'Close', { duration: 3000 });
        }
    });
}

applyFilter(): void {
    this.loaderService.show();
    this.pageIndex = 0;

    const formValues = this.filterForm.value;
    const params: any = {
        SkipCount: this.pageIndex * this.pageSize,
        MaxResultCount: this.pageSize
    };

    // Map form controls to API parameters
    if (formValues.station) params.EmployeeStationId = formValues.station;
    if (formValues.department) params.DepartmentId = formValues.department;
    if (formValues.subDepartment) params.SubDepartmentId = formValues.subDepartment;
    if (formValues.employeeGroup) params.EmployeeGroupId = formValues.employeeGroup;
    if (formValues.designation) params.DesignationId = formValues.designation;
    if (formValues.division) params.DivisionId = formValues.division;
    if (formValues.employeeCode) params.EmployeeCode = formValues.employeeCode;
    if (formValues.employeeName) params.Name = formValues.employeeName;
    if (formValues.username) params.UserName = formValues.username;
    if (formValues.employeeStatus) params.EmployeeStatusId = formValues.employeeStatus;
    if (formValues.cnic) params.Cnic = formValues.cnic;

    if (formValues.documentsAttached !== null && formValues.documentsAttached !== undefined) {
        params.HasDocuments = formValues.documentsAttached === 'yes';
    }

    if (formValues.listStatus === 'blacklist') {
        params.IsBlacklisted = true;
    } else if (formValues.listStatus === 'whitelist') {
        params.IsWhitelisted = true;
    }

    if (formValues.flag) {
        params.Flag = formValues.flag;
    }

    console.log('Sending params:', params);

    this.employeeService.getAllEmployees(params).subscribe({
        next: (response: EmployeeListResponse) => {
this.employees = response.result.items;
            this.totalCount = response.result.totalCount;
            this.dataSource = new MatTableDataSource(this.employees);

            if (this.paginator) {
                this.paginator.firstPage();
                this.paginator.length = this.totalCount;
            }

            this.loaderService.hide();

            if (response.result.items && response.result.items.length > 0) {
    this.snackBar.open('Data fetched successfully', 'Close', { duration: 2000 });
} else {
    this.snackBar.open('No data found matching this filter', 'Close', { duration: 3000 });
}

        },
        error: (error) => {
            console.error('Error filtering employees', error);
            this.loaderService.hide();
            this.snackBar.open('Error applying filters', 'Close', { duration: 3000 });
        }
    });
}

    clearFilters(): void {
        this.filterForm.reset();
        this.pageIndex = 0;
        this.loadEmployees();
        this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
    }

    onPageChange(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;

        const hasActiveFilters = Object.values(this.filterForm.value)
            .some(val => val !== null && val !== '' && val !== undefined);

        if (hasActiveFilters) {
            this.applyFilter();
        } else {
            this.loadEmployees();
        }
    }

viewEmployee(id: number): void {
  const employee = this.employees.find(e => e.id === id);
  this.dialog.open(EmployeeViewModalComponent, {
    width: '600px',
    data: employee
  });
}

editEmployee(id:number) {
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
    rehireEmployee(){}
    addNewEmployee(){}
    sendCredentials() {}
    uploadExcel() {}
    downloadPDF(){}

}
