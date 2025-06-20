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
import { EmployeeBankService } from '../../../../Services/Constants Services/employee-bank.service';
import { AddNewEmployeeBankDialogComponent } from './add-new-employee-bank-dialog/add-new-employee-bank-dialog.component';
import { DeleteEmployeeBankDialogComponent } from './delete-employee-bank-dialog/delete-employee-bank-dialog.component';
import { EditEmployeeBankDialogComponent } from './edit-employee-bank-dialog/edit-employee-bank-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface EmployeeBank {
  id: number;
  code: string;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: EmployeeBank[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-employee-bank',
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
  templateUrl: './employee-bank.component.html',
  styleUrl: './employee-bank.component.scss'
})
export class EmployeeBankComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'code', 'name', 'actions'];
  dataSource = new MatTableDataSource<EmployeeBank>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeBankService: EmployeeBankService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadEmployeeBanks();
  }

  loadEmployeeBanks(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeBankService.getAllEmployeeBanks(params).subscribe({
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
        console.error('Failed to load employee banks:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployeeBanks(event.pageIndex, event.pageSize);
  }

  viewDetails(bank: EmployeeBank) {
    console.log('View details:', bank);
    // Implement view details logic
  }

  get Math() {
    return Math;
  }

  openAddEmployeeBankDialog(): void {
    const dialogRef = this.dialog.open(AddNewEmployeeBankDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployeeBanks(0, this.pageSize);
      }
    });
  }

  openEditEmployeeBank(bank: EmployeeBank): void {
    const dialogRef = this.dialog.open(EditEmployeeBankDialogComponent, {
      width: '400px',
      data: { id: bank.id, name: bank.name, code: bank.code }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeBankService.updateEmployeeBank(result).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Employee bank updated successfully', 'Close', { duration: 3000 });
              this.loadEmployeeBanks();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to update employee bank', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error updating employee bank:', error);
            this.snackBar.open('Error updating employee bank: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openDeleteConfirmationDialog(bank: any): void {
    const dialogRef = this.dialog.open(DeleteEmployeeBankDialogComponent, {
      width: '400px',
      data: { id: bank.id, name: bank.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeBankService.deleteEmployeeBank(bank.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Employee bank deleted successfully', 'Close', { duration: 3000 });
              this.loadEmployeeBanks();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete employee bank', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting employee bank:', error);
            this.snackBar.open('Error deleting employee bank: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}