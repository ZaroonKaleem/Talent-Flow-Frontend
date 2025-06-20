import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatPaginator,
    MatPaginatorModule,
    PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeGradeService } from '../../../../Services/Constants Services/employee-grade.service';
import { AddNewGradeDialogComponent } from './add-new-grade-dialog/add-new-grade-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteGradeDialogComponent } from './delete-grade-dialog/delete-grade-dialog.component';
import { MatSnackBar, MatSnackBarLabel } from '@angular/material/snack-bar';

interface Grade {
    id: number;
    name: string;
}

interface ApiResponse {
    result: {
        totalCount: number;
        items: Grade[];
    };
    success: boolean;
    error: any;
    targetUrl: string | null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

@Component({
    selector: 'app-manage-grade',
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
        DatePipe,
    ],
    templateUrl: './manage-grade.component.html',
    styleUrl: './manage-grade.component.scss',
})
export class ManageGradeComponent implements AfterViewInit {
    displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
    dataSource = new MatTableDataSource<Grade>([]);
    totalCount = 0;
    pageSize = 10;
    pageIndex = 0;
    isTableReady = false;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private employeeGradeService: EmployeeGradeService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isTableReady = true;
        this.loadGrades();
    }

    loadGrades(
        pageIndex: number = this.pageIndex,
        pageSize: number = this.pageSize
    ) {
        const params = {
            SkipCount: pageIndex * pageSize,
            MaxResultCount: pageSize,
        };

        this.employeeGradeService.getAllEmployeeBanks(params).subscribe({
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
                console.error('Failed to load grades:', error);
            },
        });
    }

    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.loadGrades(event.pageIndex, event.pageSize);
    }

    viewDetails(grade: Grade) {
        console.log('View details:', grade);
        // Implement view details logic
    }

    exportLog(grade: Grade) {
        console.log('Export log:', grade);
        // Implement export logic
    }

    get Math() {
        return Math;
    }

    openAddGradeDialog(): void {
        const dialogRef = this.dialog.open(AddNewGradeDialogComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('New Employee Group:', result);
                // Handle the result (e.g., send to backend)
                this.loadGrades();
            }
        });
    }


      openDeleteConfirmationDialog(grade: any): void {
    const dialogRef = this.dialog.open(DeleteGradeDialogComponent, {
      width: '400px',
      data: { id: grade.id, name: grade.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeGradeService.deleteGrade(grade.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('grade deleted successfully', 'Close', { duration: 3000 });
              this.loadGrades();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete grade', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting grade:', error);
            this.snackBar.open('Error deleting grade: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
