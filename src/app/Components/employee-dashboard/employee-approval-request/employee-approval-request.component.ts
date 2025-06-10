import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-approval-request',
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
    MatCheckboxModule
  ],
  templateUrl: './employee-approval-request.component.html',
  styleUrl: './employee-approval-request.component.scss'
})
export class EmployeeApprovalRequestComponent  implements OnInit {
  filterForm!: FormGroup;
  allSelected = false;

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
  
  // Dropdown options
  stations = ['Head Office', 'Regional Office', 'Branch 1', 'Branch 2'];
  departments = ['HR', 'Finance', 'IT', 'Operations'];
  subDepartments = ['Recruitment', 'Payroll', 'Development', 'Support'];
  employeeGroups = ['Group A', 'Group B', 'Group C'];
  employees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  requestTypes = ['Leave', 'Transfer', 'Promotion', 'Salary Adjustment'];
  actions = ['Approve', 'Reject', 'Pending', 'Review'];
  
  // Sample table data
  approvals = [
    {
      id: 1,
      employeeCode: 'EMP001',
      employeeName: 'John Doe',
      station: 'Head Office',
      department: 'IT',
      requestType: 'Leave',
      status: 'Pending',
      selected: false
    },
    {
      id: 2,
      employeeCode: 'EMP002',
      employeeName: 'Jane Smith',
      station: 'Branch 1',
      department: 'HR',
      requestType: 'Transfer',
      status: 'Pending',
      selected: false
    }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

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
            this.designationOptions = result.find((r: any) => r.target === 'Designation')?.data?.items || [];
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
  ngOnInit(): void {
    this.initForm();
    this.fetchDropdownData();
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      department: [''],
      subDepartment: [''],
      employeeGroup: [''],
      employee: [''],
      employeeCode: [''],
      employeeName: [''],
      requestType: [''],
      action: [''],
      flag: ['']
    });
  }

  applyFilters() {
    console.log('Applied Filters:', this.filterForm.value);
    // Implement your filter logic here
  }

  clearFilters() {
    this.filterForm.reset();
  }

  selectAll(event: any) {
    this.allSelected = event.checked;
    this.approvals.forEach(approval => approval.selected = this.allSelected);
  }

  updateSelection() {
    this.allSelected = this.approvals.every(approval => approval.selected);
  }

  bulkApprove() {
    const selectedApprovals = this.approvals.filter(approval => approval.selected);
    console.log('Bulk approving:', selectedApprovals);
    // Implement bulk approval logic
  }

  viewDetails(approval: any) {
    console.log('View details:', approval);
    // Implement view details logic
  }

  approveRequest(approval: any) {
    console.log('Approving:', approval);
    approval.status = 'Approved';
    // Implement approval logic
  }

  rejectRequest(approval: any) {
    console.log('Rejecting:', approval);
    approval.status = 'Rejected';
    // Implement rejection logic
  }
}