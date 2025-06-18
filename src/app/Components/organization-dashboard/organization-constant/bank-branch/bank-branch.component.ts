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
import { BankBranchService } from '../../../../Services/Constants Services/bank-branch.service';

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
    MatChipsModule,
    DatePipe
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

  constructor(private bankBranchService: BankBranchService) {}

  ngOnInit() {
    this.loadBankBranches();
  }

  loadBankBranches() {
    this.isLoading = true;
    this.bankBranchService.getAllEmployeeStations().subscribe({
      next: (response) => {
        if (response.items) {
          this.bankBranches = response.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.bankBranches.length
          } as PageEvent);
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
}