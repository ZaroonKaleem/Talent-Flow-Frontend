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
import { EmployeeRegionService } from '../../../../Services/Constants Services/employee-region.service';

@Component({
  selector: 'app-manage-region',
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
  templateUrl: './manage-region.component.html',
  styleUrls: ['./manage-region.component.scss']
})
export class ManageRegionComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'code', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  regions: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(private regionService: EmployeeRegionService) {}

  ngOnInit() {
    this.loadRegions();
  }

  loadRegions() {
    this.isLoading = true;
    this.regionService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.regions = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.regions.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading regions:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.regions.slice(startIndex, endIndex);
  }

  viewDetails(region: any) {
    console.log('View details:', region);
    // Implement view details logic
  }

  exportRegion(region: any) {
    console.log('Export region:', region);
    // Implement export logic
  }

  get Math() {
    return Math;
  }
}