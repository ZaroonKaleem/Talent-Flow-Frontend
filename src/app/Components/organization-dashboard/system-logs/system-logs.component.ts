import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-system-logs',
  standalone: true,
  imports: [
     RouterModule, 
        CommonModule,
        MatListModule,
        MatDividerModule
  ],
  templateUrl: './system-logs.component.html',
  styleUrl: './system-logs.component.scss'
})
export class SystemLogsComponent {
 menuItems = [
    { name: 'Data Logs', path: 'data-logs' },
    { name: 'User Last Login', path: 'user-last-login' },
     ];
}
