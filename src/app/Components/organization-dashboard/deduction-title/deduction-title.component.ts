import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deduction-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deduction-title.component.html',
  styleUrl: './deduction-title.component.scss'
})
export class DeductionTitleComponent {
 deductions = [
    { id: 1, name: 'LUNCH', isAmount: 0, addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:31:44 PM', modifiedBy: 'Mr-Blacky' },
    { id: 2, name: 'Punishment', isAmount: 1, addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:17 PM', modifiedBy: 'Mr-Blacky' },
    { id: 3, name: 'DINNER', isAmount: 0, addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:56 PM', modifiedBy: 'Mr-Blacky' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}
