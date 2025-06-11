import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeGroupComponent } from '../employee-group/employee-group.component';

@Component({
  selector: 'app-constant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './organization-constant.component.html',
  styleUrls: ['./organization-constant.component.scss']
})
export class OraganizationConstantComponent {
  menuItems = [
    { name: 'Manage Employee Group', path: '', component: EmployeeGroupComponent },
    { name: 'Manage Designation', path: 'designation' },
    { name: 'Manage Employee Status', path: 'employee-status' },
    { name: 'Manage Allowance Title', path: 'allowance-title' },
    { name: 'Manage Deduction Title', path: 'deduction-title' },
    { name: 'Manage Employee Station', path: 'employee-station' },
    { name: 'Manage Employee Bank', path: 'employee-bank' },
    { name: 'Manage Job Title', path: 'job-title' },
    { name: 'Manage Job Field', path: 'job-field' },
    { name: 'Manage Asset Type', path: 'asset-type' },
    { name: 'Manage Employee Prefix', path: 'employee-prefix' },
    { name: 'Manage Employer Bank', path: 'employer-bank' },
    { name: 'Manage Bank Branch', path: 'bank-branch' },
    { name: 'Manage Sub Department', path: 'sub-department' },
    { name: 'Manage Client Customer', path: 'client-customer' },
    { name: 'Manage Country', path: 'manage-country' },
    { name: 'Manage Province', path: 'manage-province' },
    { name: 'Manage City', path: 'manage-city' },
    { name: 'Manage Area', path: 'manage-area' },
    { name: 'Manage Vendor', path: 'manage-vendor' },
    { name: 'Manage Region', path: 'manage-region' },
    { name: 'Manage Cost Center', path: 'manage-cost-center' },
    { name: 'Manage G.L Class', path: 'manage-gl-class' },
    { name: 'Manage Document Type', path: 'manage-document-type' },
    { name: 'Manage Marital Status', path: 'manage-marital-status' },
    { name: 'Manage Exit Type', path: 'manage-exit-type' },
    { name: 'Manage Expense Unit', path: 'manage-expense-unit' },
    { name: 'Manage Resign Type', path: 'manage-resign-type' },
    { name: 'Manage Division', path: 'manage-division' },
    { name: 'Manage Grade', path: 'manage-grade' },
    { name: 'Manage Floor', path: 'manage-floor' },
    { name: 'Manage Room', path: 'manage-room' },
    { name: 'Manage University', path: 'manage-university' },
    { name: 'Manage Gender', path: 'manage-gender' },
    { name: 'Manage Minimum Wage', path: 'manage-minimum-wage' },
  ];
}
