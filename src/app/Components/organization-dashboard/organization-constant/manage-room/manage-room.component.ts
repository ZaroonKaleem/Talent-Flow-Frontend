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
import { EmployeeRoomService } from '../../../../Services/Constants Services/employee-room.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewRoomDialogComponent } from './add-new-room-dialog/add-new-room-dialog.component';
import { DeleteRoomDialogComponent } from './delete-room-dialog/delete-room-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Room {
  id: number;
  name: string;
}

interface ApiResponse {
  result: {
    totalCount: number;
    items: Room[];
  };
  success: boolean;
  error: any;
  targetUrl: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

@Component({
  selector: 'app-manage-room',
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
  templateUrl: './manage-room.component.html',
  styleUrl: './manage-room.component.scss'
})
export class ManageRoomComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr', 'id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Room>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  isTableReady = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeRoomService: EmployeeRoomService,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isTableReady = true;
    this.loadRooms();
  }

  loadRooms(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    const params = {
      SkipCount: pageIndex * pageSize,
      MaxResultCount: pageSize
    };

    this.employeeRoomService.getAllEmployeeBanks(params).subscribe({
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
        console.error('Failed to load rooms:', error);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadRooms(event.pageIndex, event.pageSize);
  }

  viewDetails(room: Room) {
    console.log('View details:', room);
    // Implement view details logic
  }

  exportLog(room: Room) {
    console.log('Export log:', room);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

      openAddRoomDialog(): void {
          const dialogRef = this.dialog.open(AddNewRoomDialogComponent, {
              width: '400px',
          });
  
          dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                  console.log('New Employee Group:', result);
                  // Handle the result (e.g., send to backend)
                  this.loadRooms();
              }
          });
      }

        openDeleteConfirmationDialog(room: any): void {
    const dialogRef = this.dialog.open(DeleteRoomDialogComponent, {
      width: '400px',
      data: { id: room.id, name: room.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeRoomService.deleteRoom(room.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('room deleted successfully', 'Close', { duration: 3000 });
              this.loadRooms();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete room', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting room:', error);
            this.snackBar.open('Error deleting room: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}