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
import { EmployeeExitTypeService } from '../../../../Services/Constants Services/employee-exit-type.service';
import { AddNewExitTypeDialogComponent } from './add-new-exit-type-dialog/add-new-exit-type-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteExitTypeDialogComponent } from './delete-exit-type-dialog/delete-exit-type-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ExitType {
  id: number;
  name: string;
  isResignationDateRequired: boolean;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: ExitType[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-exit-type',
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
  templateUrl: './manage-exit-type.component.html',
  styleUrl: './manage-exit-type.component.scss'
})
export class ManageExitTypeComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'isResignationDateRequired', 'actions'];
  dataSource = new MatTableDataSource<ExitType>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeExitTypeService: EmployeeExitTypeService,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadExitTypes();
  }

  loadExitTypes(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeExitTypeService.getAllEmployeeBanks(params).subscribe({
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
        console.error('Failed to load exit types:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadExitTypes(event.pageIndex, event.pageSize);
  }

  viewDetails(exitType: ExitType) {
    console.log('View details:', exitType);
    // Implement view details logic
  }

  exportLog(exitType: ExitType) {
    console.log('Export log:', exitType);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

      openAddExitTypeDialog(): void {
              const dialogRef = this.dialog.open(AddNewExitTypeDialogComponent, {
                width: '400px'
              });
          
              dialogRef.afterClosed().subscribe(result => {
                if (result) {
                  console.log('New Employee Group:', result);
                  // Handle the result (e.g., send to backend)
                  this.loadExitTypes();
                }
              });
            }


    openDeleteConfirmationDialog(exitType: any): void {
    const dialogRef = this.dialog.open(DeleteExitTypeDialogComponent, {
      width: '400px',
      data: { id: exitType.id, name: exitType.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeExitTypeService.deleteExitType(exitType.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('exitType deleted successfully', 'Close', { duration: 3000 });
              this.loadExitTypes();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete exitType', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting exitType:', error);
            this.snackBar.open('Error deleting exitType: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}