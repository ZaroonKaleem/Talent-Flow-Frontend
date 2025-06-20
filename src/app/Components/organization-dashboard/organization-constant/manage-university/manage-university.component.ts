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
import { EmployeeUniversityService } from '../../../../Services/Constants Services/employee-university.service';
import { AddNewUniversityDialogComponent } from './add-new-university-dialog/add-new-university-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUniversityDialogComponent } from './delete-university-dialog/delete-university-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface University {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: University[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-university',
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
  templateUrl: './manage-university.component.html',
  styleUrl: './manage-university.component.scss'
})
export class ManageUniversityComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<University>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeUniversityService: EmployeeUniversityService,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadUniversities();
  }

  loadUniversities(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeUniversityService.getAllEmployeeStatuses(params).subscribe({
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
        console.error('Failed to load universities:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadUniversities(event.pageIndex, event.pageSize);
  }

  viewDetails(university: University) {
    console.log('View details:', university);
    // Implement view details logic
  }

  exportLog(university: University) {
    console.log('Export log:', university);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

    openAddUniversityDialog(): void {
            const dialogRef = this.dialog.open(AddNewUniversityDialogComponent, {
                width: '400px',
            });
    
            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    console.log('New Employee Group:', result);
                    // Handle the result (e.g., send to backend)
                    this.loadUniversities();
                }
            });
        }

    openDeleteConfirmationDialog(university: any): void {
    const dialogRef = this.dialog.open(DeleteUniversityDialogComponent, {
      width: '400px',
      data: { id: university.id, name: university.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeUniversityService.deleteUniversity(university.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('university deleted successfully', 'Close', { duration: 3000 });
              this.loadUniversities();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete university', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting university:', error);
            this.snackBar.open('Error deleting university: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}