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
import { ClientCustomerService } from '../../../../Services/Constants Services/client-customer.service';
import { AddNewClientCustomerDialogComponent } from './add-new-client-customer-dialog/add-new-client-customer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientCustomerDialogComponent } from './delete-client-customer-dialog/delete-client-customer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-customer',
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
  templateUrl: './client-customer.component.html',
  styleUrls: ['./client-customer.component.scss']
})
export class ClientCustomerComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  clientCustomers: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private clientCustomerService: ClientCustomerService,
    private dialog : MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadClientCustomers();
  }

  loadClientCustomers() {
    this.isLoading = true;
    this.clientCustomerService.getAllEmployeeStations().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.clientCustomers = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.clientCustomers.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading client customers:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.clientCustomers.slice(startIndex, endIndex);
  }

  viewDetails(clientCustomer: any) {
    console.log('View details:', clientCustomer);
    // Implement view details logic
  }

  exportClientCustomer(clientCustomer: any) {
    console.log('Export client customer:', clientCustomer);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

    openAddClientCustomerDialog(): void {
          const dialogRef = this.dialog.open(AddNewClientCustomerDialogComponent, {
            width: '400px'
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              // console.log('New Employee Group:', result);
              // Handle the result (e.g., send to backend)
              this.loadClientCustomers()
            }
          });
        }

          openDeleteConfirmationDialog(clientCustomer: any): void {
    const dialogRef = this.dialog.open(DeleteClientCustomerDialogComponent, {
      width: '400px',
      data: { id: clientCustomer.id, name: clientCustomer.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientCustomerService.deleteClientCustomer(clientCustomer.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('clientCustomer deleted successfully', 'Close', { duration: 3000 });
              this.loadClientCustomers();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete clientCustomer', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting clientCustomer:', error);
            this.snackBar.open('Error deleting clientCustomer: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}