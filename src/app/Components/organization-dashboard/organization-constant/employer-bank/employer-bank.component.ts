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
import { EmployeeBankService } from '../../../../Services/Constants Services/employee-bank.service';

interface EmployerBank {
  id: number;
  code: string;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: EmployerBank[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-employer-bank',
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
  templateUrl: './employer-bank.component.html',
  styleUrl: './employer-bank.component.scss'
})
export class EmployerBankComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'code', 'name', 'actions'];
  dataSource = new MatTableDataSource<EmployerBank>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeBankService: EmployeeBankService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadEmployeeBanks();
  }

  loadEmployeeBanks(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeBankService.getAllEmployeeBanks(params).subscribe({
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
        console.error('Failed to load employee banks:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployeeBanks(event.pageIndex, event.pageSize);
  }

  viewDetails(bank: EmployerBank) {
    console.log('View details:', bank);
    // Implement view details logic
  }

  exportLog(bank: EmployerBank) {
    console.log('Export log:', bank);
    // Implement export logic
  }

  get Math() {
    return Math;
  }
}