import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-division',
  standalone: true,
  imports: [
          CommonModule,
                    MatPaginator,
                    MatCardModule,
                    MatMenu,
                    MatMenuModule,
                    NgbPaginationModule
  ],
  templateUrl: './manage-division.component.html',
  styleUrl: './manage-division.component.scss'
})
export class ManageDivisionComponent {

  pageSize = 2;
currentPage = 1;
pagedItems: any[] = [];

  totalCount: number = 0;
      pageIndex: number = 0;
  
      @ViewChild(MatSort) sort!: MatSort;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      
  deleteMinimumWage(){}
  editMinimumWage(){}

  ngOnInit() {
  this.pageChanged();
}

pageChanged() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.employeeGroups.length);
  this.pagedItems = this.employeeGroups.slice(startIndex, endIndex);
}

// Add this getter for Math.min access in template
get Math() {
  return Math;
}

 employeeGroups = [
    {
      id: 1,
      name: 'Head Office',
      addedOn: '3/6/2024 1:59:27 PM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '11/13/2024 11:39:53 AM',
      modifiedBy: 'Mr-Blacky'
    },
    {
      id: 2,
      name: 'Star House',
      addedOn: '3/6/2024 1:59:32 PM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '11/13/2024 11:40:15 AM',
      modifiedBy: 'Mr-Blacky'
    },
    {
      id: 3,
      name: 'PH Management',
      addedOn: '11/13/2024 11:19:07 AM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '11/13/2024 11:40:36 AM',
      modifiedBy: 'Mr-Blacky'
    },
    {
      id: 4,
      name: 'Pak House',
      addedOn: '11/13/2024 11:40:51 AM',
      addedBy: 'Mr-Blacky',
      modifiedOn: '',
      modifiedBy: ''
    }
  ];
}
