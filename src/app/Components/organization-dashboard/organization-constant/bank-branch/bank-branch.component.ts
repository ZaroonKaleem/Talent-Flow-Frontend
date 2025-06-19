import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BankBranchService } from '../../../../Services/Constants Services/bank-branch.service';
import { AddNewBankBranchDialogComponent } from './add-new-bank-branch-dialog/add-new-bank-branch-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bank-branch',
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
    MatChipsModule
  ],
  templateUrl: './bank-branch.component.html',
  styleUrl: './bank-branch.component.scss'
})
export class BankBranchComponent implements OnInit {
  displayedColumns: string[] = [
    'sr',
    'name',
    'employerBankName',
    'cityName',
    'branchNumber',
    'accountNumber',
    'accountName',
    'actions'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];
  bankBranches: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(
    private bankBranchService: BankBranchService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadBankBranches();
  }

  loadBankBranches() {
    this.isLoading = true;
    this.bankBranchService.getAllBankBranches().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.bankBranches = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.bankBranches.length
          } as PageEvent);
        } else {
          this.bankBranches = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bank branches:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.bankBranches.slice(startIndex, endIndex);
  }

  viewDetails(bankBranch: any) {
    console.log('View details:', bankBranch);
    // Implement view details logic
  }

  exportBankBranch(bankBranch: any) {
    console.log('Export bank branch:', bankBranch);
    // Implement export logic
  }

  get Math() {
    return Math;
  }

  openAddBankBranchDialog(): void {
    const dialogRef = this.dialog.open(AddNewBankBranchDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Bank Branch:', result);
        this.loadBankBranches();
      }
    });
  }
}