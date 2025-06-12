import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-status.component.html',
  styleUrl: './employee-status.component.scss'
})
export class EmployeeStatusComponent {
  designations = [
    { id: 1, name: 'Mechanical Technician', permanent: 0, contactual: 1, addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:31:44 PM', modifiedBy: 'Mr-Blacky' },
    { id: 2, name: 'Sale Coordinator', permanent: 1, contactual: 0, addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:17 PM', modifiedBy: 'Mr-Blacky' },
    { id: 3, name: 'Account Officer', permanent: 0, contactual: 1, addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:56 PM', modifiedBy: 'Mr-Blacky' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }

}
