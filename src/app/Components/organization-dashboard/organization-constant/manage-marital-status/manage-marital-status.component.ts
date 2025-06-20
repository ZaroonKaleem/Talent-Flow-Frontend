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
import { EmployeeMaritalStatusService } from '../../../../Services/Constants Services/employee-marital-status.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewMaritalStatusDialogComponent } from './add-new-marital-status/add-new-marital-status.component';
import { DeleteMaritalStatusDialogComponent } from './delete-marital-status-dialog/delete-marital-status-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface MaritalStatus {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: MaritalStatus[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

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
export class ManageMaritalStatusComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<MaritalStatus>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeMaritalStatusService: EmployeeMaritalStatusService,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadMaritalStatuses();
  }

  loadMaritalStatuses(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeMaritalStatusService.getAllEmployeeStations(params).subscribe({
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
        console.error('Failed to load marital statuses:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadMaritalStatuses(event.pageIndex, event.pageSize);
  }

  viewDetails(status: MaritalStatus) {
    console.log('View details:', status);
    // Implement view details logic
  }

  exportLog(status: MaritalStatus) {
    console.log('Export log:', status);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

   openAddMaritalStatusDialog(): void {
              const dialogRef = this.dialog.open(AddNewMaritalStatusDialogComponent, {
                width: '400px'
              });
          
              dialogRef.afterClosed().subscribe(result => {
                if (result) {
                  console.log('New Employee Group:', result);
                  // Handle the result (e.g., send to backend)
                  this.loadMaritalStatuses();
                }
              });
            }

    openDeleteConfirmationDialog(maritalStatus: any): void {
    const dialogRef = this.dialog.open(DeleteMaritalStatusDialogComponent, {
      width: '400px',
      data: { id: maritalStatus.id, name: maritalStatus.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeMaritalStatusService.deleteMaritalStatus(maritalStatus.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('maritalStatus deleted successfully', 'Close', { duration: 3000 });
              this.loadMaritalStatuses();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete maritalStatus', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting maritalStatus:', error);
            this.snackBar.open('Error deleting maritalStatus: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}