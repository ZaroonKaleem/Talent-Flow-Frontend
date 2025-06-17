import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-attendance-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],

  templateUrl: './attendance-summary.component.html',
  styleUrl: './attendance-summary.component.scss'
})
export class AttendanceSummaryComponent {
displayedColumns: string[] = ['title', 'balance'];
  leaveData = [
    { title: 'Present', balance: '12.00' },
    { title: 'Absent', balance: '12.00' },
    { title: 'Present', balance: '6.00' },
    { title: 'Present', balance: '6.00' }
    // Add more rows as needed
  ];
}
