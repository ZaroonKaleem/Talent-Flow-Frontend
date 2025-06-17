import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-requests-approvals',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatTableModule],
  templateUrl: './requests-approvals.component.html',
  styleUrl: './requests-approvals.component.scss'
})
export class RequestsApprovalsComponent {
displayedColumns: string[] = ['type', 'value'];
  dataSource = [
    { type: 1, value: '' },
    { type: 2, value: '' },
    { type: 3, value: '' },
    { type: 4, value: '' }
    // Add more as needed
  ];
}
