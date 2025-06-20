import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeStationService } from '../../../../Services/Constants Services/employee-station.service';
import { AddNewEmployeeStationDialogComponent } from './add-new-employee-station-dialog/add-new-employee-station-dialog.component';
import { DeleteEmployeeStationDialogComponent } from './delete-employee-station-dialog/delete-employee-station-dialog.component';
import { EditEmployeeStationDialogComponent } from './edit-employee-station-dialog/edit-employee-station-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface EmployeeStation {
  id: number;
  code: string;
  name: string;
  areaId: number;
  areaName: string;
  stationHeadId: number | null;
  stationHeadName: string;
  hrManagerId: number | null;
  hrManagerName: string;
  accountsManagerId: number | null;
  accountsManagerName: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: EmployeeStation[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-employee-station',
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
  templateUrl: './employee-station.component.html',
  styleUrls: ['./employee-station.component.scss']
})
export class EmployeeStationComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'code', 'name', 'areaName', 'stationHeadName', 'hrManagerName', 'accountsManagerName', 'actions'];
  dataSource = new MatTableDataSource<EmployeeStation>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeStationService: EmployeeStationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadEmployeeStations();
  }

  loadEmployeeStations(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeStationService.getAllEmployeeStations(params).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.dataSource.data = response.result.items;
          this.totalCount = response.result.totalCount;
          this.pageIndex = pageIndex;
        } else {
          console.error('API error:', response.error);
        }
      },
      error: (error) => {
        console.error('Failed to load employee stations:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadEmployeeStations(event.pageIndex, event.pageSize);
  }

  viewDetails(station: EmployeeStation) {
    console.log('View details:', station);
    // Implement view details logic
  }

  get Math() {
    return Math;
  }

  openAddEmployeeStationDialog(): void {
    const dialogRef = this.dialog.open(AddNewEmployeeStationDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployeeStations(0, this.pageSize);
      }
    });
  }

  openEditEmployeeStation(station: EmployeeStation): void {
    const dialogRef = this.dialog.open(EditEmployeeStationDialogComponent, {
      width: '400px',
      data: {
        id: station.id,
        name: station.name,
        code: station.code,
        areaId: station.areaId,
        stationHeadId: station.stationHeadId,
        hrManagerId: station.hrManagerId,
        accountsManagerId: station.accountsManagerId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeStationService.updateEmployeeStation(result).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Employee station updated successfully', 'Close', { duration: 3000 });
              this.loadEmployeeStations();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to update employee station', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error updating employee station:', error);
            this.snackBar.open('Error updating employee station: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openDeleteConfirmationDialog(station: any): void {
    const dialogRef = this.dialog.open(DeleteEmployeeStationDialogComponent, {
      width: '400px',
      data: { id: station.id, name: station.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeStationService.deleteEmployeeStation(station.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Employee station deleted successfully', 'Close', { duration: 3000 });
              this.loadEmployeeStations();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete employee station', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting employee station:', error);
            this.snackBar.open('Error deleting employee station: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}