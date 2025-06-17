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
import { EmployeeDesignationService } from '../../../../Services/Constants Services/employee-designation.service';

interface Designation {
  id: number;
  code: string;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: Designation[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-designation',
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
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'code', 'name', 'id', 'actions'];
  dataSource = new MatTableDataSource<Designation>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private designationService: EmployeeDesignationService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadDesignations();
  }

  loadDesignations(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.designationService.getAllDesignations(params).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.dataSource.data = response.result.items;
          this.totalCount = response.result.totalCount;
          this.pageIndex = pageIndex;
        } else {
          console.error('API error:', response.error);
        }
      },
      error: (error: any) => {
        console.error('Failed to load designations:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadDesignations(event.pageIndex, event.pageSize);
  }

  viewDetails(designation: Designation) {
    console.log('View details:', designation);
    // Implement view details logic
  }

  exportLog(designation: Designation) {
    console.log('Export log:', designation);
    // Implement export logic
  }

  get Math() {
    return Math;
  }
}