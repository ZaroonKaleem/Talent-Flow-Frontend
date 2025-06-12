import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-bank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-bank.component.html',
  styleUrl: './employee-bank.component.scss'
})
export class EmployeeBankComponent {
 designations = [
    { id: 1, name: 'Alfalah Bank', code: "AHB", addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    { id: 2, name: 'Habib Bank', code: "HBL", addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    { id: 3, name: 'MCB', code: "test", addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn: '-', modifiedBy: '-' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}
