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
import { EmployeeAllowanceService } from '../../../../Services/Constants Services/employee-allowance.service';
import { AddNewAllowanceTitleDialogComponent } from './add-new-allowance-title-dialog/add-new-allowance-title-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAllowanceTitleDialogComponent } from './delete-allowance-title-dialog/delete-allowance-title-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Allowance {
  id: number;
  name: string;
  isAmount: boolean;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: Allowance[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-allowance-title',
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
  templateUrl: './allowance-title.component.html',
  styleUrl: './allowance-title.component.scss'
})
export class AllowanceTitleComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'isAmount', 'actions'];
  dataSource = new MatTableDataSource<Allowance>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private allowanceService: EmployeeAllowanceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadAllowances();
  }

  loadAllowances(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.allowanceService.getAllAllowances(params).subscribe({
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
        console.error('Failed to load allowances:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadAllowances(event.pageIndex, event.pageSize);
  }

  viewDetails(allowance: Allowance) {
    console.log('View details:', allowance);
    // Implement view details logic
  }

  exportLog(allowance: Allowance) {
    console.log('Export log:', allowance);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

      openAddAllowanceTitleDialog(): void {
        const dialogRef = this.dialog.open(AddNewAllowanceTitleDialogComponent, {
          width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadAllowances(0, this.pageSize)
          }
        });
      }

        openDeleteConfirmationDialog(allowance: any): void {
    const dialogRef = this.dialog.open(DeleteAllowanceTitleDialogComponent, {
      width: '400px',
      data: { id: allowance.id, name: allowance.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allowanceService.deleteAllowance(allowance.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('allowance deleted successfully', 'Close', { duration: 3000 });
              this.loadAllowances();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete allowance', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting allowance:', error);
            this.snackBar.open('Error deleting allowance: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}