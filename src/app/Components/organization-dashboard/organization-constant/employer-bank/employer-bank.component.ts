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
import { AddNewEmployerBankDialogComponent } from './add-new-employer-bank-dialog/add-new-employer-bank-dialog.component';
import { EmployerBankService } from '../../../../Services/Constants Services/employer-bank.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEmployerBankDialogComponent } from './delete-employer-bank-dialog/delete-employer-bank-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface EmployerBank {
  id: number;
  // code: string;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: EmployerBank[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-employer-bank',
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
  templateUrl: './employer-bank.component.html',
  styleUrl: './employer-bank.component.scss'
})
export class EmployerBankComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<EmployerBank>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeBankService: EmployeeBankService,
    private employerBankService: EmployerBankService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadEmployerBanks();
  }

  loadEmployerBanks(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employerBankService.getAllEmployerBanks(params).subscribe({
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
    this.loadEmployerBanks(event.pageIndex, event.pageSize);
  }

  viewDetails(bank: EmployerBank) {
    console.log('View details:', bank);
    // Implement view details logic
  }

  exportLog(bank: EmployerBank) {
    console.log('Export log:', bank);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

      openAddEmployerBankDialog(): void {
          const dialogRef = this.dialog.open(AddNewEmployerBankDialogComponent, {
            width: '400px'
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('New Employee Group:', result);
              // Handle the result (e.g., send to backend)
              this.loadEmployerBanks()
            }
          });
        }


         openDeleteConfirmationDialog(employerBank: any): void {
        const dialogRef = this.dialog.open(DeleteEmployerBankDialogComponent, {
          width: '400px',
          data: { id: employerBank.id, name: employerBank.name }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.employerBankService.deleteEmployerBank(employerBank.id).subscribe({
              next: (response) => {
                if (response.success) {
                  this.snackBar.open('Designation deleted successfully', 'Close', { duration: 3000 });
                  this.loadEmployerBanks();
                } else {
                  this.snackBar.open(response.error?.message || 'Failed to delete designation', 'Close', { duration: 3000 });
                }
              },
              error: (error) => {
                console.error('Error deleting designation:', error);
                this.snackBar.open('Error deleting designation: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
              }
            });
          }
        });
      }
}