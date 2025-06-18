import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EmployeeGroupService } from '../../../../Services/Constants Services/employee-group-service.service';
import { AddNewEmployeeGroupDialogComponent } from './add-new-employee-group-dialog/add-new-employee-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface EmployeeGroup {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: EmployeeGroup[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-employee-group',
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
  templateUrl: './employee-group.component.html',
  styleUrl: './employee-group.component.scss'
})
export class EmployeeGroupComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<EmployeeGroup>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeGroupService: EmployeeGroupService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadEmployeeGroups();
  }

  openAddEmployeeGroupDialog(): void {
    const dialogRef = this.dialog.open(AddNewEmployeeGroupDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Employee Group:', result);
        // Handle the result (e.g., send to backend)
      }
    });
  }

  loadEmployeeGroups(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeGroupService.getAllEmployeeGroups(params).subscribe({
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
        console.error('Failed to load employee groups:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployeeGroups(event.pageIndex, event.pageSize);
  }

  viewDetails(group: EmployeeGroup) {
    console.log('View details:', group);
    // Implement view details logic
  }

  exportLog(group: EmployeeGroup) {
    console.log('Export log:', group);
    // Implement export logic
  }

  // Access Math in template
  get Math() {
    return Math;
  }
}