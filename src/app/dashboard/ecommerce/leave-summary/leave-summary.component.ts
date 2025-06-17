import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-leave-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './leave-summary.component.html',
  styleUrl: './leave-summary.component.scss'
})
export class LeaveSummaryComponent {
displayedColumns: string[] = ['title', 'balance'];
  leaveData = [
    { title: 'AL', balance: '12.00' },
    { title: 'CL', balance: '12.00' },
    { title: 'SL', balance: '6.00' }
    // Add more rows as needed
  ];
}
