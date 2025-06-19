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
import { EmployeeProvinceService } from '../../../../Services/Constants Services/employee-province.service';
import { AddNewProvinceDialogComponent } from './add-new-province-dialog/add-new-province-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-province',
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
  templateUrl: './manage-province.component.html',
  styleUrls: ['./manage-province.component.scss']
})
export class ManageProvinceComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'countryName', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  provinces: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(private provinceService: EmployeeProvinceService, 
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces() {
    this.isLoading = true;
    this.provinceService.getAllProvinces().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.provinces = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.provinces.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading provinces:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.provinces.slice(startIndex, endIndex);
  }

  viewDetails(province: any) {
    console.log('View details:', province);
    // Implement view details logic
  }

  exportProvince(province: any) {
    console.log('Export province:', province);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

   openAddProvinceDialog(): void {
        const dialogRef = this.dialog.open(AddNewProvinceDialogComponent, {
          width: '400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadProvinces();
          }
        });
      }
}