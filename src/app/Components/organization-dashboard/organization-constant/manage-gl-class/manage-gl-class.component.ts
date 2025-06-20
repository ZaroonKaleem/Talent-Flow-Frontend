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
import { EmployeeGlService } from '../../../../Services/Constants Services/employee-gl.service';
import { AddNewGlClassDialogComponent } from './add-new-gl-class-dialog/add-new-gl-class-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteGlClassDialogComponent } from './delete-gl-class-dialog/delete-gl-class-dialog.component';

@Component({
  selector: 'app-manage-gl-class',
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
  templateUrl: './manage-gl-class.component.html',
  styleUrl: './manage-gl-class.component.scss'
})
export class ManageGlClassComponent implements OnInit {
  displayedColumns: string[] = [
    'sr',
    'code',
    'name',
    'actions'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];
  glClasses: any[] = [];
  totalCount = 0;

  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

    paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private glService: EmployeeGlService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadGlClasses();
  }

  loadGlClasses() {
    this.glService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.glClasses = response.result.items;
          this.totalCount = response.result.totalCount;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.glClasses.length
          } as PageEvent);
        }
      },
      error: (err) => {
        console.error('Error loading GL Classes:', err);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.glClasses.slice(startIndex, endIndex);
  }

  viewDetails(glClass: any) {
    console.log('View details:', glClass);
    // Implement view details logic
  }

  exportGlClass(glClass: any) {
    console.log('Export GL Class:', glClass);
    // Implement export logic
  }

      get Math() {
    return Math;
  }

    openAddGlClassDialog(): void {
            const dialogRef = this.dialog.open(AddNewGlClassDialogComponent, {
              width: '400px'
            });
        
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                console.log('New Employee Group:', result);
                // Handle the result (e.g., send to backend)
                this.loadGlClasses();
              }
            });
          }

      openDeleteConfirmationDialog(glClass: any): void {
    const dialogRef = this.dialog.open(DeleteGlClassDialogComponent, {
      width: '400px',
      data: { id: glClass.id, name: glClass.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.glService.deleteGlClass(glClass.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('glClass deleted successfully', 'Close', { duration: 3000 });
              this.loadGlClasses();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete glClass', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting glClass:', error);
            this.snackBar.open('Error deleting glClass: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}