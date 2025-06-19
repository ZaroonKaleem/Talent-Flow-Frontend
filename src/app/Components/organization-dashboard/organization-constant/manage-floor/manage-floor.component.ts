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
import { EmployeeFloorService } from '../../../../Services/Constants Services/employee-floor.service';
import { AddNewFloorDialogComponent } from './add-new-floor-dialog/add-new-floor-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Floor {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: Floor[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-floor',
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
  templateUrl: './manage-floor.component.html',
  styleUrl: './manage-floor.component.scss'
})
export class ManageFloorComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Floor>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeFloorService: EmployeeFloorService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadFloors();
  }

  loadFloors(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeFloorService.getAllEmployeeStations(params).subscribe({
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
        console.error('Failed to load floors:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadFloors(event.pageIndex, event.pageSize);
  }

  viewDetails(floor: Floor) {
    console.log('View details:', floor);
    // Implement view details logic
  }

  exportLog(floor: Floor) {
    console.log('Export log:', floor);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

      openAddFloorDialog(): void {
          const dialogRef = this.dialog.open(AddNewFloorDialogComponent, {
              width: '400px',
          });
  
          dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                  console.log('New Employee Group:', result);
                  // Handle the result (e.g., send to backend)
                  this.loadFloors();
              }
          });
      }
}