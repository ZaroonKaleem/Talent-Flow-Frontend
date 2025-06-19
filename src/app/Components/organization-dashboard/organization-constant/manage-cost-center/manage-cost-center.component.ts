import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmployeeCostCenterService } from '../../../../Services/Constants Services/employee-cost-center.service';
import { AddNewCostCenterDialogComponent } from './add-new-cost-center-dialog/add-new-cost-center-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-cost-center',
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
  templateUrl: './manage-cost-center.component.html',
  styleUrl: './manage-cost-center.component.scss'
})
export class ManageCostCenterComponent implements OnInit {
  displayedColumns: string[] = [
    'sr',
    'code',
    'name',
    'actions'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];
  costCenters: any[] = [];
  totalCount = 0;

  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

    paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private costCenterService: EmployeeCostCenterService,
    private dialog: MatDialog
) {}

  ngOnInit() {
    this.loadCostCenters();
  }

  loadCostCenters() {
    this.costCenterService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.costCenters = response.result.items;
          this.totalCount = response.result.totalCount;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.costCenters.length
          } as PageEvent);
        }
      },
      error: (err) => {
        console.error('Error loading cost centers:', err);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.costCenters.slice(startIndex, endIndex);
  }

  viewDetails(costCenter: any) {
    console.log('View details:', costCenter);
    // Implement view details logic
  }

  exportCostCenter(costCenter: any) {
    console.log('Export cost center:', costCenter);
    // Implement export logic
  }

    get Math() {
    return Math;
  }

    openAddCostCenterDialog(): void {
        const dialogRef = this.dialog.open(AddNewCostCenterDialogComponent, {
          width: '400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadCostCenters();
          }
        });
      }
}