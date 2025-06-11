import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent {
  designations = [
    { id: 1, name: 'Mechanical Technician', code: 1, addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:31:44 PM', modifiedBy: 'Mr-Blacky' },
    { id: 2, name: 'Sale Coordinator', code: 2, addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:17 PM', modifiedBy: 'Mr-Blacky' },
    { id: 3, name: 'Account Officer', code: 3, addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:56 PM', modifiedBy: 'Mr-Blacky' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}

