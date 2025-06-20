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
import { EmployeeMinimumWageService } from '../../../../Services/Constants Services/employee-minimum-wage.service';
import { AddNewMinimumWageDialogComponent } from './add-new-minimum-wage-dialog/add-new-minimum-wage-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMinimumWageDialogComponent } from './delete-minimum-wage-dialog/delete-minimum-wage-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface MinimumWage {
  id: number;
  name: string;
  provinceId: number;
  provinceName: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: MinimumWage[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-minimum-wage',
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
  templateUrl: './minimum-wage.component.html',
  styleUrl: './minimum-wage.component.scss'
})
export class MinimumWageComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'provinceId', 'provinceName', 'actions'];
  dataSource = new MatTableDataSource<MinimumWage>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeMinimumWageService: EmployeeMinimumWageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadMinimumWages();
  }

  loadMinimumWages(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeMinimumWageService.getAllEmployeeStations(params).subscribe({
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
        console.error('Failed to load minimum wages:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadMinimumWages(event.pageIndex, event.pageSize);
  }

  viewDetails(minimumWage: MinimumWage) {
    console.log('View details:', minimumWage);
    // Implement view details logic
  }

  exportLog(minimumWage: MinimumWage) {
    console.log('Export log:', minimumWage);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

   openAddMinimumWageDialog(): void {
              const dialogRef = this.dialog.open(AddNewMinimumWageDialogComponent, {
                  width: '400px',
              });
      
              dialogRef.afterClosed().subscribe((result) => {
                  if (result) {
                      console.log('New Employee Group:', result);
                      // Handle the result (e.g., send to backend)
                      this.loadMinimumWages();
                  }
              });
          }


    openDeleteConfirmationDialog(minimumWage: any): void {
    const dialogRef = this.dialog.open(DeleteMinimumWageDialogComponent, {
      width: '400px',
      data: { id: minimumWage.id, name: minimumWage.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeMinimumWageService.deleteMinimumWage(minimumWage.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('minimumWage deleted successfully', 'Close', { duration: 3000 });
              this.loadMinimumWages();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete minimumWage', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting minimumWage:', error);
            this.snackBar.open('Error deleting minimumWage: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}