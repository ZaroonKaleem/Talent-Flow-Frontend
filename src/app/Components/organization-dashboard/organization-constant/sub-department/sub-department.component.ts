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
import { SubDepartmentService } from '../../../../Services/Constants Services/sub-department.service';

@Component({
  selector: 'app-sub-department',
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
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.scss']
})
export class SubDepartmentComponent implements OnInit {
  displayedColumns: string[] = [
    'sr',
    'name',
    'departmentName',
    'subDepartmentCode',
    'subDepartmentHeadName',
    'actions'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];
  subDepartments: any[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(private subDepartmentService: SubDepartmentService) {}

  ngOnInit() {
    this.loadSubDepartments();
  }

  loadSubDepartments() {
    this.isLoading = true;
    this.subDepartmentService.getAllEmployeeBanks().subscribe({
      next: (response) => {
        if (response.success && response.result?.items) {
          this.subDepartments = response.result.items;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.subDepartments.length
          } as PageEvent);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading sub departments:', error);
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.subDepartments.slice(startIndex, endIndex);
  }

  viewDetails(subDepartment: any) {
    console.log('View details:', subDepartment);
    // Implement view details logic
  }

  exportSubDepartment(subDepartment: any) {
    console.log('Export sub department:', subDepartment);
    // Implement export logic
  }

  get Math() {
    return Math;
  }
}