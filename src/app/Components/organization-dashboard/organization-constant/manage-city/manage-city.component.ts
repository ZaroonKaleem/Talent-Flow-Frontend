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
import { EmployeeCityService } from '../../../../Services/Constants Services/employee-city.service';
import { AddNewCityDialogComponent } from './add-new-city-dialog/add-new-city-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-city',
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
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.scss']
})
export class ManageCityComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'provinceName', 'countryName', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  cities: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private cityService: EmployeeCityService,
  private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.isLoading = true;
    this.cityService.getAllCities().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.cities = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.cities.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cities:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.cities.slice(startIndex, endIndex);
  }

  viewDetails(city: any) {
    console.log('View details:', city);
    // Implement view details logic
  }

  exportCity(city: any) {
    console.log('Export city:', city);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

    openAddCountryDialog(): void {
        const dialogRef = this.dialog.open(AddNewCityDialogComponent, {
          width: '400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadCities();
          }
        });
      }
}