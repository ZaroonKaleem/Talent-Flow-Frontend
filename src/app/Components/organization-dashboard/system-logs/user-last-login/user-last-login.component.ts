import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-last-login',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    DatePipe
  ],
  templateUrl: './user-last-login.component.html',
  styleUrl: './user-last-login.component.scss'
})
export class UserLastLoginComponent {
  displayedColumns: string[] = [
    'sr', 
    'employee', 
    'employeeDetails', 
    'address', 
    'lastLoginDate',
    'lastLoginTime'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  
  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.employeeGroups.slice(startIndex, endIndex);
  }

  // Updated sample data with additional employee details
  employeeGroups = [
    {
      id: 1,
      dateTime: new Date('2024-03-06T13:59:27'),
      employeeName: 'John Doe',
      employeeId: 'EMP-001',
      department: 'HR',
      position: 'Manager',
      ipAddress: '192.168.1.101',
      location: 'New York, USA'
    },
    {
      id: 2,
      dateTime: new Date('2024-03-06T13:59:32'),
      employeeName: 'Jane Smith',
      employeeId: 'EMP-002',
      department: 'Finance',
      position: 'Accountant',
      ipAddress: '192.168.1.102',
      location: 'London, UK'
    },
    {
      id: 3,
      dateTime: new Date('2024-11-13T11:19:07'),
      employeeName: 'Robert Johnson',
      employeeId: 'EMP-003',
      department: 'IT',
      position: 'Developer',
      ipAddress: '203.34.56.78',
      location: 'Tokyo, Japan'
    },
    {
      id: 4,
      dateTime: new Date('2024-11-13T11:40:51'),
      employeeName: 'Emily Davis',
      employeeId: 'EMP-004',
      department: 'Marketing',
      position: 'Designer',
      ipAddress: '192.168.1.105'
    },
    {
      id: 5,
      dateTime: new Date('2024-03-06T13:59:27'),
      employeeName: 'Michael Brown',
      employeeId: 'EMP-005',
      department: 'Operations',
      position: 'Supervisor',
      ipAddress: '192.168.1.106',
      location: 'Chicago, USA'
    },
    {
      id: 6,
      dateTime: new Date('2024-03-06T13:59:27'),
      employeeName: 'Sarah Wilson',
      employeeId: 'EMP-006',
      department: 'Sales',
      position: 'Representative',
      ipAddress: '192.168.1.107',
      location: 'Los Angeles, USA'
    },
  ];

  ngOnInit() {
    this.pageChanged({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.employeeGroups.length
    } as PageEvent);
  }

  get Math() {
    return Math;
  }
}