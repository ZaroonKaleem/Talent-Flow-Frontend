import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-group.component.html',
  styleUrls: ['./employee-group.component.scss']
})
export class EmployeeGroupComponent {
  employeeGroups = [
    {
      id: 1,
      name: 'Head Office',
      addedOn: '3/6/2024 1:59:27 PM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '11/13/2024 11:39:53 AM',
      modifiedBy: 'Mr-Blacky'
    },
    {
      id: 2,
      name: 'Star House',
      addedOn: '3/6/2024 1:59:32 PM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '11/13/2024 11:40:15 AM',
      modifiedBy: 'Mr-Blacky'
    },
    {
      id: 3,
      name: 'PH Management',
      addedOn: '11/13/2024 11:19:07 AM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '11/13/2024 11:40:36 AM',
      modifiedBy: 'Mr-Blacky'
    },
    {
      id: 4,
      name: 'Pak House',
      addedOn: '11/13/2024 11:40:51 AM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '',
      modifiedBy: ''
    }
  ];
}
