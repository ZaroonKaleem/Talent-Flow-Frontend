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
import { EmployeeDivisionService } from '../../../../Services/Constants Services/employee-division.service';
import { AddNewDivisionDialogComponent } from './add-new-division-dialog/add-new-division-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDivisionDialogComponent } from './delete-division-dialog/delete-division-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Division {
    id: number;
    name: string;
}

interface ApiResponse {
    result: {
        totalCount: number;
        items: Division[];
    };
    success: boolean;
    error: any;
    targetUrl: string | null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

@Component({
    selector: 'app-manage-division',
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
    templateUrl: './manage-division.component.html',
    styleUrl: './manage-division.component.scss',
})
export class ManageDivisionComponent implements AfterViewInit {
    displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
    dataSource = new MatTableDataSource<Division>([]);
    totalCount = 0;
    pageSize = 10;
    pageIndex = 0;
    isTableReady = false;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private employeeDivisionService: EmployeeDivisionService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isTableReady = true;
        this.loadDivisions();
    }

    loadDivisions(
        pageIndex: number = this.pageIndex,
        pageSize: number = this.pageSize
    ) {
        const params = {
            SkipCount: pageIndex * pageSize,
            MaxResultCount: pageSize,
        };

        this.employeeDivisionService.getAllEmployeeBanks(params).subscribe({
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
                console.error('Failed to load divisions:', error);
            },
        });
    }

    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.loadDivisions(event.pageIndex, event.pageSize);
    }

    viewDetails(division: Division) {
        console.log('View details:', division);
        // Implement view details logic
    }

    exportLog(division: Division) {
        console.log('Export log:', division);
        // Implement export logic
    }

    get Math() {
        return Math;
    }

    openAddDivisionDialog(): void {
        const dialogRef = this.dialog.open(AddNewDivisionDialogComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log('New Employee Group:', result);
                // Handle the result (e.g., send to backend)
                this.loadDivisions();
            }
        });
    }

      openDeleteConfirmationDialog(division: any): void {
    const dialogRef = this.dialog.open(DeleteDivisionDialogComponent, {
      width: '400px',
      data: { id: division.id, name: division.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeDivisionService.deleteDivision(division.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('division deleted successfully', 'Close', { duration: 3000 });
              this.loadDivisions();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete division', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting division:', error);
            this.snackBar.open('Error deleting division: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
