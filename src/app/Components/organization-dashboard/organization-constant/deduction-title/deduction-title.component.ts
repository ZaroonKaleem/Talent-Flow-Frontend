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
import { EmployeeDeductionService } from '../../../../Services/Constants Services/employee-deduction.service';
import { AddNewDeductionTitleDialogComponent } from './add-new-deduction-title-dialog/add-new-deduction-title-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDeductionTitleDialogComponent } from './delete-deduction-title-dialog/delete-deduction-title-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Deduction {
  id: number;
  name: string;
  isAmount: boolean;
  deductionType: number;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: Deduction[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-deduction-title',
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
  templateUrl: './deduction-title.component.html',
  styleUrl: './deduction-title.component.scss'
})
export class DeductionTitleComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'isAmount', 'deductionType', 'actions'];
  dataSource = new MatTableDataSource<Deduction>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private deductionService: EmployeeDeductionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadDeductions();
  }

  loadDeductions(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.deductionService.getAllDeductions(params).subscribe({
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
        console.error('Failed to load deductions:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadDeductions(event.pageIndex, event.pageSize);
  }

  viewDetails(deduction: Deduction) {
    console.log('View details:', deduction);
    // Implement view details logic
  }

  exportLog(deduction: Deduction) {
    console.log('Export log:', deduction);
    // Implement export logic
  }

  // Map deductionType to readable labels
  getDeductionTypeLabel(deductionType: number): string {
    const typeMap: { [key: number]: string } = {
      0: 'General',
      1: 'Tax',
      2: 'Social Security'
    };
    return typeMap[deductionType] || 'Unknown';
  }

  get Math() {
    return Math;
  }

      openAddDeductionTitleDialog(): void {
        const dialogRef = this.dialog.open(AddNewDeductionTitleDialogComponent, {
          width: '400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadDeductions(0, this.pageSize)
          }
        });
      }

        openDeleteConfirmationDialog(deductionTitle: any): void {
    const dialogRef = this.dialog.open(DeleteDeductionTitleDialogComponent, {
      width: '400px',
      data: { id: deductionTitle.id, name: deductionTitle.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deductionService.deleteDeduction(deductionTitle.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('deductionTitle deleted successfully', 'Close', { duration: 3000 });
              this.loadDeductions();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete deductionTitle', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting deductionTitle:', error);
            this.snackBar.open('Error deleting deductionTitle: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}