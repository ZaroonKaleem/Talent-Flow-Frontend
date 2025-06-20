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
import { EmployeeGenderService } from '../../../../Services/Constants Services/employee-gender.service';
import { AddNewGenderDialogComponent } from './add-new-gender-dialog/add-new-gender-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteGenderDialogComponent } from './delete-gender-dialog/delete-gender-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Gender {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: Gender[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-gender',
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
  templateUrl: './manage-gender.component.html',
  styleUrl: './manage-gender.component.scss'
})
export class ManageGenderComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Gender>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeGenderService: EmployeeGenderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadGenders();
  }

  loadGenders(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeGenderService.getAllEmployeeStations(params).subscribe({
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
        console.error('Failed to load genders:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadGenders(event.pageIndex, event.pageSize);
  }

  viewDetails(gender: Gender) {
    console.log('View details:', gender);
    // Implement view details logic
  }

  exportLog(gender: Gender) {
    console.log('Export log:', gender);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

     openAddGenderDialog(): void {
            const dialogRef = this.dialog.open(AddNewGenderDialogComponent, {
                width: '400px',
            });
    
            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    console.log('New Employee Group:', result);
                    // Handle the result (e.g., send to backend)
                    this.loadGenders();
                }
            });
        }

    openDeleteConfirmationDialog(gender: any): void {
    const dialogRef = this.dialog.open(DeleteGenderDialogComponent, {
      width: '400px',
      data: { id: gender.id, name: gender.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeGenderService.deleteGender(gender.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('gender deleted successfully', 'Close', { duration: 3000 });
              this.loadGenders();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete gender', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting gender:', error);
            this.snackBar.open('Error deleting gender: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}