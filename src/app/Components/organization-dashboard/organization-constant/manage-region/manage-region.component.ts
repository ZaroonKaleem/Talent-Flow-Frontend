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
import { AddNewRegionDialogComponent } from './add-new-region-dialog/add-new-region-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRegionDialogComponent } from './delete-region-dialog/delete-region-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private regionService: EmployeeRegionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

   openAddRegionDialog(): void {
          const dialogRef = this.dialog.open(AddNewRegionDialogComponent, {
            width: '400px'
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('New Employee Group:', result);
              // Handle the result (e.g., send to backend)
              this.loadRegions();
            }
          });
        }


    openDeleteConfirmationDialog(region: any): void {
    const dialogRef = this.dialog.open(DeleteRegionDialogComponent, {
      width: '400px',
      data: { id: region.id, name: region.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regionService.deleteRegion(region.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('region deleted successfully', 'Close', { duration: 3000 });
              this.loadRegions();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete region', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting region:', error);
            this.snackBar.open('Error deleting region: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}