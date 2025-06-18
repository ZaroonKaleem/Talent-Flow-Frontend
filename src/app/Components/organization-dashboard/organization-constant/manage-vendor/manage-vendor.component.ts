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
  displayedColumns: string[] = ['sr', 'name', 'contactPerson', 'email', 'phone', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  vendors: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(private vendorService: EmployeeVendorService) {}

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
}