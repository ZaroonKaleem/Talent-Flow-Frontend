import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatTableModule],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss'
})
export class EntriesComponent {
 displayedColumns: string[] = ['sno', 'date', 'status', 'request'];
  dataSource = [
    { sno: 1, date: '01-February-2024', status: 'Absent', request: 'Leave / Attendance' },
    { sno: 2, date: '02-February-2024', status: 'Absent', request: 'Leave / Attendance' },
    { sno: 3, date: '05-February-2024', status: 'Absent', request: 'Leave / Attendance' },
    { sno: 4, date: '06-February-2024', status: 'Absent', request: 'Leave / Attendance' }
    // Add more as needed
  ];
}
