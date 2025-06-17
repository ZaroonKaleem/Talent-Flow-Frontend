import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-marital-status',
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
  templateUrl: './manage-marital-status.component.html',
  styleUrl: './manage-marital-status.component.scss'
})
export class ManageMaritalStatusComponent {
displayedColumns: string[] = [
       'sr', 
       'dateTime', 
       'employee', 
       'details', 
       'address', 
       'logType',
       'module',
       'screenResolution',
       'actions'
     ];
     
     pageSize = 10;
     pagedItems: any[] = [];
   
     @ViewChild(MatSort) sort!: MatSort;
     // @ViewChild(MatPaginator) paginator!: MatPaginator;
   
     // In your component class
   paginator: any = {
     pageIndex: 0,
     pageSize: this.pageSize
   };
   
   // Update your pageChanged method to maintain these values
   pageChanged(event: PageEvent) {
     this.paginator.pageIndex = event.pageIndex;
     this.paginator.pageSize = event.pageSize;
     const startIndex = event.pageIndex * event.pageSize;
     const endIndex = startIndex + event.pageSize;
     this.pagedItems = this.employeeGroups.slice(startIndex, endIndex);
   }
     // Sample data with your requested fields
     employeeGroups = [
       {
         id: 1,
         dateTime: new Date('2024-03-06T13:59:27'),
         employeeName: 'John Doe',
         employeeId: 'EMP-001',
         details: 'Updated personal information',
         ipAddress: '192.168.1.101',
         location: 'New York, USA',
         logType: 'INFO',
         module: 'HR Management',
         screenResolution: '1920x1080'
       },
       {
         id: 2,
         dateTime: new Date('2024-03-06T13:59:32'),
         employeeName: 'Jane Smith',
         employeeId: 'EMP-002',
         details: 'Approved leave request',
         ipAddress: '192.168.1.102',
         location: 'London, UK',
         logType: 'SUCCESS',
         module: 'Leave Management',
         screenResolution: '1366x768'
       },
       {
         id: 3,
         dateTime: new Date('2024-11-13T11:19:07'),
         employeeName: 'Robert Johnson',
         employeeId: 'EMP-003',
         details: 'Failed login attempt',
         ipAddress: '203.34.56.78',
         location: 'Tokyo, Japan',
         logType: 'ERROR',
         module: 'Authentication',
         screenResolution: '1440x900'
       },
       {
         id: 4,
         dateTime: new Date('2024-11-13T11:40:51'),
         employeeName: 'Emily Davis',
         employeeId: 'EMP-004',
         details: 'Created new report',
         ipAddress: '192.168.1.105',
         logType: 'WARNING',
         module: 'Reporting',
         screenResolution: '2560x1440'
       },
        {
         id: 5,
         dateTime: new Date('2024-03-06T13:59:27'),
         employeeName: 'John Doe',
         employeeId: 'EMP-001',
         details: 'Updated personal information',
         ipAddress: '192.168.1.101',
         location: 'New York, USA',
         logType: 'INFO',
         module: 'HR Management',
         screenResolution: '1920x1080'
       },
        {
         id: 6,
         dateTime: new Date('2024-03-06T13:59:27'),
         employeeName: 'John Doe',
         employeeId: 'EMP-001',
         details: 'Updated personal information',
         ipAddress: '192.168.1.101',
         location: 'New York, USA',
         logType: 'INFO',
         module: 'HR Management',
         screenResolution: '1920x1080'
       },
     ];
   
     ngOnInit() {
       this.pageChanged({
         pageIndex: 0,
         pageSize: this.pageSize,
         length: this.employeeGroups.length
       } as PageEvent);
     }
   
     viewDetails(log: any) {
       console.log('View details:', log);
       // Implement view details logic
     }
   
     exportLog(log: any) {
       console.log('Export log:', log);
       // Implement export logic
     }
   
     // Access Math in template
     get Math() {
       return Math;
     }
   }