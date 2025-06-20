import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmployeePrefixService } from '../../../../Services/Constants Services/employee-prefix.service';
import { AddNewEmployeePrefixDialogComponent } from './add-new-employee-prefix-dialog/add-new-employee-prefix-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEmployeePrefixDialogComponent } from './delete-employee-prefix-dialog/delete-employee-prefix-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-prefix',
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
  templateUrl: './employee-prefix.component.html',
  styleUrl: './employee-prefix.component.scss'
})
export class EmployeePrefixComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  prefixes: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private prefixService: EmployeePrefixService,
    private employeePrefixService: EmployeePrefixService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPrefixes();
  }

  loadPrefixes() {
    this.isLoading = true;
    this.prefixService.getAllEmployeeStations().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.prefixes = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.prefixes.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading prefixes:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.prefixes.slice(startIndex, endIndex);
  }

  viewDetails(prefix: any) {
    console.log('View details:', prefix);
    // Implement view details logic
  }

  exportPrefix(prefix: any) {
    console.log('Export prefix:', prefix);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

    openAddEmployeePrefixDialog(): void {
          const dialogRef = this.dialog.open(AddNewEmployeePrefixDialogComponent, {
            width: '400px'
          });
    
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('New Employee Group:', result);
              // Handle the result (e.g., send to backend)
              this.loadPrefixes()
            }
          });
        }


          openDeleteConfirmationDialog(prefix: any): void {
    const dialogRef = this.dialog.open(DeleteEmployeePrefixDialogComponent, {
      width: '400px',
      data: { id: prefix.id, name: prefix.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeePrefixService.deleteEmployeePrefix(prefix.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('prefix deleted successfully', 'Close', { duration: 3000 });
              this.loadPrefixes();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete prefix', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting prefix:', error);
            this.snackBar.open('Error deleting prefix: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}