import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeGroupComponent } from '../employee-group/employee-group.component';
@Component({
  selector: 'app-constant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './organization-constant.component.html',
  styleUrls: [ './organization-constant.component.scss']
})
export class OraganizationConstantComponent {
  menuItems = [
    {path:'', component: EmployeeGroupComponent},
    { name: 'Manage Designation', route: '#' },
    { name: 'Manage Employee Status', route: '#' },
    { name: 'Manage Allowance Title', route: '#' },
    { name: 'Manage Deduction Title', route: '#' },
    { name: 'Manage Employee Station', route: '#' },
    { name: 'Manage Employee Bank', route: '#' },
    { name: 'Manage Job Title', route: '#' },
    { name: 'Manage Job Field', route: '#' },
    { name: 'Manage Asset Type', route: '#' },
    { name: 'Manage Employee Prefix', route: '#' },
    { name: 'Manage Employer Bank', route: '#' },
    { name: 'Manage Bank Branch', route: '#' },
    { name: 'Manage Sub Department', route: '#' },
    { name: 'Manage Client Customer', route: '#' },
    { name: 'Manage Country', route: '#' },
    { name: 'Manage Province', route: '#' }
  ];
}
