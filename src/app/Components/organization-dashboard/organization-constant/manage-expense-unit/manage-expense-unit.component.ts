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
import { EmployeeExpenseUnitService } from '../../../../Services/Constants Services/employee-expense-unit.service';
import { AddNewExpenseUnitDialogComponent } from './add-new-expense-unit-dialog/add-new-expense-unit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteExpenseUnitDIalogComponent } from './delete-expense-unit-dialog/delete-expense-unit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ExpenseUnit {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: ExpenseUnit[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-expense-unit',
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
  templateUrl: './manage-expense-unit.component.html',
  styleUrl: './manage-expense-unit.component.scss'
})
export class ManageExpenseUnitComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<ExpenseUnit>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeExpenseUnitService: EmployeeExpenseUnitService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadExpenseUnits();
  }

  loadExpenseUnits(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeExpenseUnitService.getAllEmployeeStations(params).subscribe({
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
        console.error('Failed to load expense units:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadExpenseUnits(event.pageIndex, event.pageSize);
  }

  viewDetails(unit: ExpenseUnit) {
    console.log('View details:', unit);
    // Implement view details logic
  }

  exportLog(unit: ExpenseUnit) {
    console.log('Export log:', unit);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

     openAddExpenseUnitDialog(): void {
                const dialogRef = this.dialog.open(AddNewExpenseUnitDialogComponent, {
                  width: '400px'
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    console.log('New Employee Group:', result);
                    // Handle the result (e.g., send to backend)
                    this.loadExpenseUnits();
                  }
                });
              }


   openDeleteConfirmationDialog(expenseUnit: any): void {
    const dialogRef = this.dialog.open(DeleteExpenseUnitDIalogComponent, {
      width: '400px',
      data: { id: expenseUnit.id, name: expenseUnit.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeExpenseUnitService.deleteExpenseUnit(expenseUnit.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('expenseUnit deleted successfully', 'Close', { duration: 3000 });
              this.loadExpenseUnits();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete expenseUnit', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting expenseUnit:', error);
            this.snackBar.open('Error deleting expenseUnit: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}