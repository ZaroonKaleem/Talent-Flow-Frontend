import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-bank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-bank.component.html',
  styleUrl: './employer-bank.component.scss'
})
export class EmployerBankComponent {
designations = [
    { id: 1, name: 'Accountant', addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    { id: 2, name: 'Software Engineer', addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}
