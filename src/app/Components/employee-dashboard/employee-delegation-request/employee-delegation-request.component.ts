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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, EmployeeListResponse } from '../employee-list/employee-list.component';
import { EmployeeViewModalComponent } from '../employee-view-modal/employee-view-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../Services/employee.service';
import { LoaderService } from '../../../shared/loader.service';
import { MatSort } from '@angular/material/sort';
import { MatMenu, MatMenuModule } from '@angular/material/menu';



@Component({
    selector: 'app-employee-delegation-request',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule, // Required for ngModel in checkboxes
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
    templateUrl: './employee-delegation-request.component.html',
    styleUrl: './employee-delegation-request.component.scss',
})
export class EmployeeDelegationRequestComponent implements OnInit {
    filterForm!: FormGroup;
    allSelected = false;

    // Dropdown options
    stations = ['Head Office', 'Regional Office', 'Branch 1', 'Branch 2'];
    designations = ['Manager', 'Supervisor', 'Executive', 'Director'];
    subDepartments = ['Operations', 'Support', 'Development', 'Administration'];
    employeeGroups = ['Group A', 'Group B', 'Group C'];
 
    statuses = ['Pending', 'Approved', 'Rejected', 'Completed'];
    requestTypes = ['Temporary', 'Permanent', 'Emergency'];
    modules = [
        'Leave Management',
        'Expense Approval',
        'Document Signing',
        'All Modules',
    ];

    // Sample table data
    delegationRequests = [
        {
            id: 1,
            requestedEmployeeId: 1,
            delegatedEmployeeId: 2,
            designation: 'Manager',
            moduleName: 'Leave Management',
            status: 'Pending',
            selected: false,
        },
        {
            id: 2,
            requestedEmployeeId: 3,
            delegatedEmployeeId: 1,
            designation: 'Supervisor',
            moduleName: 'Expense Approval',
            status: 'Pending',
            selected: false,
        },
    ];

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

        employees: Employee[] = [];

    totalCount: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;

        dataSource!: MatTableDataSource<Employee>;
    
            @ViewChild(MatSort) sort!: MatSort;
        
        @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private fb: FormBuilder, 
      private http: HttpClient,
              private router: Router,
              private store: Store,
              private loaderService: LoaderService,
              private employeeService: EmployeeService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.fetchDropdownData();
        this.loadEmployees();
    }

    fetchDropdownData() {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            console.error('Access token not found.');
            return;
        }

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const targets = [
            'Allowance',
            'AnnouncementType',
            'AssetType',
            'ClientCustomer',
            'CostCenter',
            'Country',
            'Deduction',
            'Designation',
            'Division',
            'DocumentType',
            'Employee',
            'EmployeeBank',
            'EmployeeGroup',
            'EmployeePrefix',
            'EmployeeStatus',
            'EmployerBank',
            'ExitType',
            'ExpenseUnit',
            'Floor',
            'Gender',
            'GLClass',
            'Grade',
            'Job',
            'JobField',
            'MaritalStatus',
            'Region',
            'ResignType',
            'Room',
            'Univercity',
            'Announcement',
            'Area',
            'BankBranch',
            'City',
            'DayClose',
            'Department',
            'EmployeeStation',
            'GazettedHoliday',
            'MinimumWage',
            'Project',
            'Province',
            'SubDepartment',
            'Task',
            'Vendor',
        ];

        const params = {
            Targets: targets.join(','),
        };

        this.http
            .get<any>(
                `${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`,
                {
                    headers,
                    params,
                }
            )
            .subscribe({
                next: (response) => {
                    const result = response?.result || [];

                    this.employeeOptions =
                        result.find((r: any) => r.target === 'Employee')?.data
                            ?.items || [];
                    this.employeeStationOptions =
                        result.find((r: any) => r.target === 'EmployeeStation')
                            ?.data?.items || [];
                    this.designationOptions =
                        result.find((r: any) => r.target === 'Designation')
                            ?.data?.items || [];
                    this.departmentOptions =
                        result.find((r: any) => r.target === 'Department')?.data
                            ?.items || [];
                    this.subDepartmentOptions =
                        result.find((r: any) => r.target === 'SubDepartment')
                            ?.data?.items || [];
                    this.employeeGroupOptions =
                        result.find((r: any) => r.target === 'EmployeeGroup')
                            ?.data?.items || [];
                    this.allowanceOptions =
                        result.find((r: any) => r.target === 'Allowance')?.data
                            ?.items || [];
                    this.announcementTypeOptions =
                        result.find((r: any) => r.target === 'AnnouncementType')
                            ?.data?.items || [];
                    this.assetTypeOptions =
                        result.find((r: any) => r.target === 'AssetType')?.data
                            ?.items || [];
                    this.clientCustomerOptions =
                        result.find((r: any) => r.target === 'ClientCustomer')
                            ?.data?.items || [];
                    this.costCenterOptions =
                        result.find((r: any) => r.target === 'CostCenter')?.data
                            ?.items || [];
                    this.countryOptions =
                        result.find((r: any) => r.target === 'Country')?.data
                            ?.items || [];
                    this.deductionOptions =
                        result.find((r: any) => r.target === 'Deduction')?.data
                            ?.items || [];
                    this.divisionOptions =
                        result.find((r: any) => r.target === 'Division')?.data
                            ?.items || [];
                    this.documentTypeOptions =
                        result.find((r: any) => r.target === 'DocumentType')
                            ?.data?.items || [];
                    this.employeeBankOptions =
                        result.find((r: any) => r.target === 'EmployeeBank')
                            ?.data?.items || [];
                    this.employeePrefixOptions =
                        result.find((r: any) => r.target === 'EmployeePrefix')
                            ?.data?.items || [];
                    this.employeeStatusOptions =
                        result.find((r: any) => r.target === 'EmployeeStatus')
                            ?.data?.items || [];
                    this.employerBankOptions =
                        result.find((r: any) => r.target === 'EmployerBank')
                            ?.data?.items || [];
                    this.exitTypeOptions =
                        result.find((r: any) => r.target === 'ExitType')?.data
                            ?.items || [];
                    this.expenseUnitOptions =
                        result.find((r: any) => r.target === 'ExpenseUnit')
                            ?.data?.items || [];
                    this.floorOptions =
                        result.find((r: any) => r.target === 'Floor')?.data
                            ?.items || [];
                    this.genderOptions =
                        result.find((r: any) => r.target === 'Gender')?.data
                            ?.items || [];
                    this.glClassOptions =
                        result.find((r: any) => r.target === 'GLClass')?.data
                            ?.items || [];
                    this.gradeOptions =
                        result.find((r: any) => r.target === 'Grade')?.data
                            ?.items || [];
                    this.jobOptions =
                        result.find((r: any) => r.target === 'Job')?.data
                            ?.items || [];
                    this.jobFieldOptions =
                        result.find((r: any) => r.target === 'JobField')?.data
                            ?.items || [];
                    this.maritalStatusOptions =
                        result.find((r: any) => r.target === 'MaritalStatus')
                            ?.data?.items || [];
                    this.regionOptions =
                        result.find((r: any) => r.target === 'Region')?.data
                            ?.items || [];
                    this.resignTypeOptions =
                        result.find((r: any) => r.target === 'ResignType')?.data
                            ?.items || [];
                    this.roomOptions =
                        result.find((r: any) => r.target === 'Room')?.data
                            ?.items || [];
                    this.univercityOptions =
                        result.find((r: any) => r.target === 'Univercity')?.data
                            ?.items || [];
                    this.announcementOptions =
                        result.find((r: any) => r.target === 'Announcement')
                            ?.data?.items || [];
                    this.areaOptions =
                        result.find((r: any) => r.target === 'Area')?.data
                            ?.items || [];
                    this.bankBranchOptions =
                        result.find((r: any) => r.target === 'BankBranch')?.data
                            ?.items || [];
                    this.cityOptions =
                        result.find((r: any) => r.target === 'City')?.data
                            ?.items || [];
                    this.dayCloseOptions =
                        result.find((r: any) => r.target === 'DayClose')?.data
                            ?.items || [];
                    this.gazettedHolidayOptions =
                        result.find((r: any) => r.target === 'GazettedHoliday')
                            ?.data?.items || [];
                    this.minimumWageOptions =
                        result.find((r: any) => r.target === 'MinimumWage')
                            ?.data?.items || [];
                    this.projectOptions =
                        result.find((r: any) => r.target === 'Project')?.data
                            ?.items || [];
                    this.provinceOptions =
                        result.find((r: any) => r.target === 'Province')?.data
                            ?.items || [];
                    this.taskOptions =
                        result.find((r: any) => r.target === 'Task')?.data
                            ?.items || [];
                    this.vendorOptions =
                        result.find((r: any) => r.target === 'Vendor')?.data
                            ?.items || [];

                    console.log('All dropdown data loaded successfully');
                },
                error: (err) => {
                    console.error('Dropdown data fetch failed:', err);
                },
            });
    }

    initForm() {
        this.filterForm = this.fb.group({
            station: [''],
            designation: [''],
            subDepartment: [''],
            employeeGroup: [''],
            requestedEmployee: [''],
            delegatedEmployee: [''],
            status: [''],
            requestType: [''],
            flag: [''],
            moduleName: [''],
        });
    }

    getEmployeeName(employeeId: number): string {
        const employee = this.employees.find((emp) => emp.id === employeeId);
        return employee ? employee.name : 'Unknown';
    }

    applyFilters() {
        console.log('Applied Filters:', this.filterForm.value);
        // Implement your filter logic here
    }

    // clearFilters() {
    //     this.filterForm.reset();
    // }

    selectAll(event: any) {
        this.allSelected = event.checked;
        this.delegationRequests.forEach(
            (request) => (request.selected = this.allSelected)
        );
    }

    updateSelection() {
        this.allSelected = this.delegationRequests.every(
            (request) => request.selected
        );
    }

    bulkApprove() {
        const selectedRequests = this.delegationRequests.filter(
            (request) => request.selected
        );
        console.log('Bulk approving:', selectedRequests);
        // Implement bulk approval logic
    }

    viewDetails(request: any) {
        console.log('View details:', request);
        // Implement view details logic
    }

    approveRequest(request: any) {
        console.log('Approving:', request);
        request.status = 'Approved';
        // Implement approval logic
    }

    rejectRequest(request: any) {
        console.log('Rejecting:', request);
        request.status = 'Rejected';
        // Implement rejection logic
    }



       loadEmployees(): void {
        this.loaderService.show();
        const params = {
            SkipCount: this.pageIndex * this.pageSize,
            MaxResultCount: this.pageSize
        };
    
        this.employeeService.getAllDelegationRequests(params).subscribe({
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
