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
import { EmployeeVendorService } from '../../../../Services/Constants Services/employee-vendor.service';
import { AddNewVendorDialogComponent } from './add-new-vendor-dialog/add-new-vendor-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVendorDialogComponent } from './delete-vendor-dialog/delete-vendor-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-vendor',
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
  templateUrl: './manage-vendor.component.html',
  styleUrls: ['./manage-vendor.component.scss']
})
export class ManageVendorComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'code', 'serviceChargesPercentage', 'countryName', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  vendors: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private vendorService: EmployeeVendorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.isLoading = true;
    this.vendorService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.vendors = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.vendors.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.vendors.slice(startIndex, endIndex);
  }

  viewDetails(vendor: any) {
    console.log('View details:', vendor);
    // Implement view details logic
  }

  exportVendor(vendor: any) {
    console.log('Export vendor:', vendor);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

  openAddVendorDialog(): void {
    const dialogRef = this.dialog.open(AddNewVendorDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Vendor:', result);
        this.loadVendors();
      }
    });
  }

    openDeleteConfirmationDialog(vendor: any): void {
    const dialogRef = this.dialog.open(DeleteVendorDialogComponent, {
      width: '400px',
      data: { id: vendor.id, name: vendor.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vendorService.deleteVendor(vendor.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('vendor deleted successfully', 'Close', { duration: 3000 });
              this.loadVendors();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete vendor', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting vendor:', error);
            this.snackBar.open('Error deleting vendor: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}