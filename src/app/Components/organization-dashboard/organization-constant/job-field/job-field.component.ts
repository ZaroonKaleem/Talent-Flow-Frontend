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
import { EmployeeJobFieldService } from '../../../../Services/Constants Services/employee-job-field.service';
import { AddNewJobFieldDialogComponent } from './add-new-job-field-dialog/add-new-job-field-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteJobFieldDialogComponent } from './delete-job-field-dialog/delete-job-field-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-field',
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
  templateUrl: './job-field.component.html',
  styleUrl: './job-field.component.scss'
})
export class JobFieldComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  jobFields: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(private jobFieldService: EmployeeJobFieldService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadJobFields();
  }

  loadJobFields() {
    this.isLoading = true;
    this.jobFieldService.getAllEmployeeStations().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.jobFields = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.jobFields.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading job fields:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.jobFields.slice(startIndex, endIndex);
  }

  viewDetails(jobField: any) {
    console.log('View details:', jobField);
    // Implement view details logic
  }

  exportJobField(jobField: any) {
    console.log('Export job field:', jobField);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

    openAddJobFieldDialog(): void {
        const dialogRef = this.dialog.open(AddNewJobFieldDialogComponent, {
          width: '400px'
        });
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadJobFields()
          }
        });
      }


        openDeleteConfirmationDialog(jobField: any): void {
    const dialogRef = this.dialog.open(DeleteJobFieldDialogComponent, {
      width: '400px',
      data: { id: jobField.id, name: jobField.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobFieldService.deleteJobField(jobField.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('jobField deleted successfully', 'Close', { duration: 3000 });
              this.loadJobFields();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete jobField', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting jobField:', error);
            this.snackBar.open('Error deleting jobField: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}