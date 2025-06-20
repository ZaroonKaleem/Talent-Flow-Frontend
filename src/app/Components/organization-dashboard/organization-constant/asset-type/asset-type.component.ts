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
import { EmployeeAssetTypeService } from '../../../../Services/Constants Services/employee-asset-type.service';
import { AddNewAssetTypeDialogComponent } from './add-new-asset-type-dialog/add-new-asset-type-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAssetTypeDialogComponent } from './delete-asset-type-dialog/delete-asset-type-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asset-type',
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
  templateUrl: './asset-type.component.html',
  styleUrl: './asset-type.component.scss'
})
export class AssetTypeComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'name', 'actions'];
  pageSize = 10;
  pagedItems: any[] = [];
  assetTypes: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private assetTypeService: EmployeeAssetTypeService,
    private employeeAssetTypeService: EmployeeAssetTypeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAssetTypes();
  }

  loadAssetTypes() {
    this.isLoading = true;
    this.assetTypeService.getAllEmployeeStations().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.assetTypes = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.assetTypes.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading asset types:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.assetTypes.slice(startIndex, endIndex);
  }

  viewDetails(assetType: any) {
    console.log('View details:', assetType);
    // Implement view details logic
  }

  exportAssetType(assetType: any) {
    console.log('Export asset type:', assetType);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

      openAddAssetTypeDialog(): void {
        const dialogRef = this.dialog.open(AddNewAssetTypeDialogComponent, {
          width: '400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // console.log('New Employee Group:', result);
            // Handle the result (e.g., send to backend)
            this.loadAssetTypes()
          }
        });
      }


        openDeleteConfirmationDialog(asset: any): void {
    const dialogRef = this.dialog.open(DeleteAssetTypeDialogComponent, {
      width: '400px',
      data: { id: asset.id, name: asset.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assetTypeService.deleteAssetType(asset.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('asset deleted successfully', 'Close', { duration: 3000 });
              this.loadAssetTypes();
            } else {
              this.snackBar.open(response.error?.message || 'Failed to delete asset', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            console.error('Error deleting asset:', error);
            this.snackBar.open('Error deleting asset: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}