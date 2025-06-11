import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.scss'
})
export class ManageCountryComponent {
  designations = [
    { id: 1, name: 'Pakistan', code: "PK", addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:31:44 PM', modifiedBy: 'Mr-Blacky' },
    { id: 2, name: 'India', code: "IND", addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:17 PM', modifiedBy: 'Mr-Blacky' },
    { id: 3, name: 'China', code: "CHN", addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:56 PM', modifiedBy: 'Mr-Blacky' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}
