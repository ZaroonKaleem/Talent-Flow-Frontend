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
import { DeleteCityDialogComponent } from './delete-city-dialog/delete-city-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

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

    openDeleteConfirmationDialog(city: any): void {
    const dialogRef = this.dialog.open(DeleteCityDialogComponent, {
      width: '400px',
      data: { id: city.id, name: city.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cityService.deleteity(city.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('city deleted successfully', 'Close', { duration: 3000 });
              this.loadCities();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete city', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting city:', error);
            this.snackBar.open('Error deleting city: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}