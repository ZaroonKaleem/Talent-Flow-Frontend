import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-province',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-province.component.html',
  styleUrl: './manage-province.component.scss'
})
export class ManageProvinceComponent {
designations = [
    { id: 1, name: 'Pakistan', country: "Pakistan", addedOn: '3/6/2024 1:59:52 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:31:44 PM', modifiedBy: 'Mr-Blacky' },
    { id: 2, name: 'India', country: "India", addedOn: '3/6/2024 2:00:12 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:17 PM', modifiedBy: 'Mr-Blacky' },
    { id: 3, name: 'China', country: "China", addedOn: '3/6/2024 2:00:29 PM', addedBy: 'Mr-Blacky', modifiedOn: '11/13/2024 12:32:56 PM', modifiedBy: 'Mr-Blacky' },
    // Add rest of data...
  ];
  editDesignation(item: any): void {
    // You can route to another page or open a modal here
  }
}
