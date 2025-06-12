import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-customer.component.html',
  styleUrl: './client-customer.component.scss'
})
export class ClientCustomerComponent {
  designations = [
    { id: 1, name: 'Faizan', addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    { id: 2, name: 'Zubair', addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    { id: 3, name: 'Abdul', addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn:  '-', modifiedBy: '-' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}
