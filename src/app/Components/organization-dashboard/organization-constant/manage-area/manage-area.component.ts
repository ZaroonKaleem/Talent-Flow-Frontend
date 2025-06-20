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
import { EmployeeAreaService } from '../../../../Services/Constants Services/employee-area.service';
import { AddNewAreaDialogComponent } from './add-new-area-dialog/add-new-area-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAreaDialogComponent } from './delete-area-dialog/delete-area-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-area',
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
  templateUrl: './manage-area.component.html',
  styleUrls: ['./manage-area.component.scss']
})
export class ManageAreaComponent implements OnInit {
  displayedColumns: string[] = [
    'sr',
    'name',
    'cityName',
    'provinceName',
    'countryName',
    'actions'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];
  areas: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private areaService: EmployeeAreaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    this.isLoading = true;
    this.areaService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.areas = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.areas.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading areas:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.areas.slice(startIndex, endIndex);
  }

  viewDetails(area: any) {
    console.log('View details:', area);
    // Implement view details logic
  }

  exportArea(area: any) {
    console.log('Export area:', area);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

  openAddAreaDialog(): void {
          const dialogRef = this.dialog.open(AddNewAreaDialogComponent, {
            width: '400px'
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('New Employee Group:', result);
              // Handle the result (e.g., send to backend)
              this.loadAreas();
            }
          });
        }

      openDeleteConfirmationDialog(area: any): void {
    const dialogRef = this.dialog.open(DeleteAreaDialogComponent, {
      width: '400px',
      data: { id: area.id, name: area.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.areaService.deleteArea(area.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('area deleted successfully', 'Close', { duration: 3000 });
              this.loadAreas();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete area', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting area:', error);
            this.snackBar.open('Error deleting area: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}