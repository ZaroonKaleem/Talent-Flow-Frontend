import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-payslip',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButton, MatTableModule],
  templateUrl: './employee-payslip.component.html',
  styleUrl: './employee-payslip.component.scss'
})
export class EmployeePayslipComponent {
displayedColumns: string[] = ['payslip', 'action' ];
  leaveData = [
    { slip: 'August - 2023' },
    { slip: 'July - 2023' },
    { slip: 'March - 2023' },
    // Add more rows as needed
  ];
}