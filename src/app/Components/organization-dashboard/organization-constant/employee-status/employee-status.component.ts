import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeStatusService } from '../../../../Services/Constants Services/employee-status.service';

interface EmployeeStatus {
  id: number;
  name: string;
  isContractual: boolean;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: EmployeeStatus[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-employee-status',
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
  templateUrl: './employee-status.component.html',
  styleUrl: './employee-status.component.scss'
})
export class EmployeeStatusComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'isContractual', 'actions'];
  dataSource = new MatTableDataSource<EmployeeStatus>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeStatusService: EmployeeStatusService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadEmployeeStatuses();
  }

  loadEmployeeStatuses(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeStatusService.getAllEmployeeStatuses(params).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.dataSource.data = response.result.items;
          this.totalCount = response.result.totalCount;
          this.pageIndex = pageIndex;
        } else {
          console.error('API error:', response.error);
        }
      },
      error: (error) => {
        console.error('Failed to load employee statuses:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployeeStatuses(event.pageIndex, event.pageSize);
  }

  viewDetails(status: EmployeeStatus) {
    console.log('View details:', status);
    // Implement view details logic
  }

  exportLog(status: EmployeeStatus) {
    console.log('Export log:', status);
    // Implement export logic
  }

  get Math() {
    return Math;
  }
}