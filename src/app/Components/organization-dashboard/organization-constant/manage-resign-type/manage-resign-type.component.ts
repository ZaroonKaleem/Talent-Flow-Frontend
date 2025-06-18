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
import { EmployeeResignTypeService } from '../../../../Services/Constants Services/employee-resign-type.service';

interface ResignType {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: ResignType[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-resign-type',
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
  templateUrl: './manage-resign-type.component.html',
  styleUrl: './manage-resign-type.component.scss'
})
export class ManageResignTypeComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<ResignType>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeResignTypeService: EmployeeResignTypeService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadResignTypes();
  }

  loadResignTypes(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeResignTypeService.getAllEmployeeBanks(params).subscribe({
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
        console.error('Failed to load resign types:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadResignTypes(event.pageIndex, event.pageSize);
  }

  viewDetails(resignType: ResignType) {
    console.log('View details:', resignType);
    // Implement view details logic
  }

  exportLog(resignType: ResignType) {
    console.log('Export log:', resignType);
    // Implement export logic
  }

  get Math() {
    return Math;
  }
}