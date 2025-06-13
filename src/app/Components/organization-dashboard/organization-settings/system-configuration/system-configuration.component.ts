import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-system-configuration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.scss']
})
export class SystemConfigurationComponent {
  // // Attendance Configurations
  // attendanceStatus: boolean = true;
  // excludeBreakTime: boolean = true;

  // // Leave Options
  // leaveOptions = [
  //   { name: 'Payroll', enabled: true },
  //   { name: 'Employee', enabled: true },
  //   { name: 'DashBoard', enabled: true },
  //   { name: 'Recruitment', enabled: false },
  //   { name: 'Expense', enabled: false },
  //   { name: 'EmployeeSeparation', enabled: false }
  // ];

  // constructor() { }

  // onAttendanceStatusChange(): void {
  //   console.log('Attendance Status changed to:', this.attendanceStatus);
  // }

  // onBreakTimeChange(): void {
  //   console.log('Exclude Break Time changed to:', this.excludeBreakTime);
  // }

  // onLeaveOptionChange(option: any): void {
  //   option.enabled = !option.enabled;
  //   console.log(`${option.name} option changed to:`, option.enabled);
  // }

  // saveConfigurations(): void {
  //   console.log('Saving configurations...');
  //   console.log('Attendance Status:', this.attendanceStatus);
  //   console.log('Exclude Break Time:', this.excludeBreakTime);
  //   console.log('Leave Options:', this.leaveOptions.filter(opt => opt.enabled).map(opt => opt.name));
  // }
}