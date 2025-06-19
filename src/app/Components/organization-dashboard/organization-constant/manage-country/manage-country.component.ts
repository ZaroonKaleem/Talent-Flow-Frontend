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
import { EmployeeCountryService } from '../../../../Services/Constants Services/employee-country.service';
import { AddNewCountryDialogComponent } from './add-new-country-dialog/add-new-country-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-country',
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
  templateUrl: './manage-country.component.html',
  styleUrls: ['./manage-country.component.scss']
})
export class ManageCountryComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'code', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  countries: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private countryService: EmployeeCountryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.isLoading = true;
    this.countryService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.countries = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.countries.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.countries.slice(startIndex, endIndex);
  }

  viewDetails(country: any) {
    console.log('View details:', country);
    // Implement view details logic
  }

  exportCountry(country: any) {
    console.log('Export country:', country);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

  openAddCountryDialog(): void {
      const dialogRef = this.dialog.open(AddNewCountryDialogComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('New Employee Group:', result);
          // Handle the result (e.g., send to backend)
          this.loadCountries();
        }
      });
    }
}