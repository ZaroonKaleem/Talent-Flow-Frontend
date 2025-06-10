import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../../environments/environment.dev';

@Component({
  selector: 'app-employee-append-department',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule
  ],
  templateUrl: './employee-append-department.component.html',
  styleUrl: './employee-append-department.component.scss'
})
export class EmployeeAppendDepartmentComponent  implements OnInit {
  appendForm!: FormGroup;
  allSelected = false;
  
  // Dropdown options
  stations = ['Head Office', 'Branch 1', 'Branch 2', 'Remote'];
  departments = ['HR', 'Finance', 'IT', 'Operations'];
  subDepartments = ['Recruitment', 'Payroll', 'Development', 'Support'];
  employeeGroups = ['Group A', 'Group B', 'Group C'];
  employees = [
    { id: 1, name: 'John Doe', code: 'EMP001' },
    { id: 2, name: 'Jane Smith', code: 'EMP002' },
    { id: 3, name: 'Robert Johnson', code: 'EMP003' }
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

  // Sample table data
  appendRequests = [
    {
      id: 1,
      employeeCode: 'EMP001',
      employeeName: 'John Doe',
      station: 'Head Office',
      department: 'IT',
      duration: 15,
      status: 'Pending',
      selected: false
    },
    {
      id: 2,
      employeeCode: 'EMP002',
      employeeName: 'Jane Smith',
      station: 'Branch 1',
      department: 'HR',
      duration: 30,
      status: 'Approved',
      selected: false
    }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
    this.setupFormListeners();
    this.fetchDropdownData();
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
            
            this.http.get<any>(`${environment.apiUrl}services/app/MultiSuggestion/GetMultipleSuggestions`, {
              headers,
              params
            }).subscribe({
              next: (response) => {
                const result = response?.result || [];
                
                this.employeeOptions = result.find((r: any) => r.target === 'Employee')?.data?.items || [];
                this.employeeStationOptions = result.find((r: any) => r.target === 'EmployeeStation')?.data?.items || [];
                this.designationOptions = result.find((r: any) => r.target === 'Designation')?.data?.items || [];
                this.departmentOptions = result.find((r: any) => r.target === 'Department')?.data?.items || [];
                this.subDepartmentOptions = result.find((r: any) => r.target === 'SubDepartment')?.data?.items || [];
                this.employeeGroupOptions = result.find((r: any) => r.target === 'EmployeeGroup')?.data?.items || [];
                this.allowanceOptions = result.find((r: any) => r.target === 'Allowance')?.data?.items || [];
                this.announcementTypeOptions = result.find((r: any) => r.target === 'AnnouncementType')?.data?.items || [];
                this.assetTypeOptions = result.find((r: any) => r.target === 'AssetType')?.data?.items || [];
                this.clientCustomerOptions = result.find((r: any) => r.target === 'ClientCustomer')?.data?.items || [];
                this.costCenterOptions = result.find((r: any) => r.target === 'CostCenter')?.data?.items || [];
                this.countryOptions = result.find((r: any) => r.target === 'Country')?.data?.items || [];
                this.deductionOptions = result.find((r: any) => r.target === 'Deduction')?.data?.items || [];
                this.divisionOptions = result.find((r: any) => r.target === 'Division')?.data?.items || [];
                this.documentTypeOptions = result.find((r: any) => r.target === 'DocumentType')?.data?.items || [];
                this.employeeBankOptions = result.find((r: any) => r.target === 'EmployeeBank')?.data?.items || [];
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
                this.gazettedHolidayOptions = result.find((r: any) => r.target === 'GazettedHoliday')?.data?.items || [];
                this.minimumWageOptions = result.find((r: any) => r.target === 'MinimumWage')?.data?.items || [];
                this.projectOptions = result.find((r: any) => r.target === 'Project')?.data?.items || [];
                this.provinceOptions = result.find((r: any) => r.target === 'Province')?.data?.items || [];
                this.taskOptions = result.find((r: any) => r.target === 'Task')?.data?.items || [];
                this.vendorOptions = result.find((r: any) => r.target === 'Vendor')?.data?.items || [];
          
                console.log('All dropdown data loaded successfully');
              },
              error: (err) => {
                console.error('Dropdown data fetch failed:', err);
              }
            });
          }

  initForm() {
    this.appendForm = this.fb.group({
      station: ['', Validators.required],
      department: ['', Validators.required],
      subDepartment: ['', Validators.required],
      employeeGroup: ['', Validators.required],
      employee: ['', Validators.required],
      employeeCode: [{value: '', disabled: true}],
      duration: ['', [Validators.required, Validators.min(1)]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  setupFormListeners() {
    // Update employee code when employee is selected
    this.appendForm.get('employee')?.valueChanges.subscribe(employeeId => {
      const selectedEmployee = this.employees.find(emp => emp.id === employeeId);
      this.appendForm.get('employeeCode')?.setValue(selectedEmployee?.code || '');
    });

    // Update toDate when fromDate changes
    this.appendForm.get('fromDate')?.valueChanges.subscribe(fromDate => {
      if (fromDate && this.appendForm.get('duration')?.value) {
        this.updateToDate();
      }
    });

    // Update toDate when duration changes
    this.appendForm.get('duration')?.valueChanges.subscribe(() => {
      if (this.appendForm.get('fromDate')?.value) {
        this.updateToDate();
      }
    });
  }

  updateToDate() {
    const fromDate = this.appendForm.get('fromDate')?.value;
    const duration = this.appendForm.get('duration')?.value;
    
    if (fromDate && duration) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + parseInt(duration));
      this.appendForm.get('toDate')?.setValue(toDate);
    }
  }

    applyFilters() {
    console.log('Applied Filters:', );
    // Implement your filter logic here
  }
  clearFilters(){
    
  }

// Update your submitRequest method
submitRequest() {
  if (this.appendForm.valid) {
    const employeeId = this.appendForm.get('employee')?.value;
    const employee = this.employees.find(e => e.id === employeeId);
    
    if (!employee) {
      console.error('Selected employee not found');
      return;
    }

    const newRequest: {
      id: number;
      employeeCode: string;
      employeeName: string;
      station: string;
      department: string;
      duration: number;
      status: string;
      selected: boolean;
    } = {
      id: this.appendRequests.length + 1,
      employeeCode: this.appendForm.get('employeeCode')?.value || '',
      employeeName: employee.name,
      station: this.appendForm.get('station')?.value || '',
      department: this.appendForm.get('department')?.value || '',
      duration: this.appendForm.get('duration')?.value || 0,
      status: 'Pending',
      selected: false
    };

    this.appendRequests = [newRequest, ...this.appendRequests];
    this.appendForm.reset();
  }
}

  clearForm() {
    this.appendForm.reset();
  }

  selectAll(event: any) {
    this.allSelected = event.checked;
    this.appendRequests.forEach(request => request.selected = this.allSelected);
  }

  updateSelection() {
    this.allSelected = this.appendRequests.every(request => request.selected);
  }

  bulkAppend() {
    const selectedRequests = this.appendRequests.filter(request => request.selected);
    console.log('Bulk processing:', selectedRequests);
    // Implement bulk append logic
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
}