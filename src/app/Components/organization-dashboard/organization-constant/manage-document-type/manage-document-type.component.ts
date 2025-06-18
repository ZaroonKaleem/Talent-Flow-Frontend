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
import { EmployeeDocumentTypeService } from '../../../../Services/Constants Services/employee-document-type.service';

@Component({
  selector: 'app-manage-document-type',
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
  templateUrl: './manage-document-type.component.html',
  styleUrl: './manage-document-type.component.scss'
})
export class ManageDocumentTypeComponent implements OnInit {
  displayedColumns: string[] = [
    'sr',
    'name',
    'actions'
  ];
  
  pageSize = 10;
  pagedItems: any[] = [];
  documentTypes: any[] = [];
  totalCount = 0;

  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

      paginator: any = {
    pageIndex: 0,
    pageSize: this.pageSize
  };

  constructor(private documentTypeService: EmployeeDocumentTypeService) {}

  ngOnInit() {
    this.loadDocumentTypes();
  }

  loadDocumentTypes() {
    this.documentTypeService.getAllDesignations().subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.documentTypes = response.result.items;
          this.totalCount = response.result.totalCount;
          this.pageChanged({
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.documentTypes.length
          } as PageEvent);
        }
      },
      error: (err) => {
        console.error('Error loading document types:', err);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.documentTypes.slice(startIndex, endIndex);
  }

  viewDetails(documentType: any) {
    console.log('View details:', documentType);
    // Implement view details logic
  }

  exportDocumentType(documentType: any) {
    console.log('Export document type:', documentType);
    // Implement export logic
  }

  get Math(){
    return Math
  }
}