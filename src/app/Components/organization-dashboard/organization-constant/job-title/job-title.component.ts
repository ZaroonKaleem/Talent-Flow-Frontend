import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmployeeJobTitleService } from '../../../../Services/Constants Services/employee-job-title.service';

@Component({
  selector: 'app-job-title',
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
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.scss'
})
export class JobTitleComponent implements OnInit {
   displayedColumns: string[] = [
       'sr', 
       'name', 
       'description', 
       'actions'
     ];
     
     pageSize = 10;
     pagedItems: any[] = [];
     jobTitles: any[] = [];
     isLoading = true;
   
     @ViewChild(MatSort) sort!: MatSort;
   
     paginator: any = {
       pageIndex: 0,
       pageSize: this.pageSize
     };
   
   constructor(private jobTitleService: EmployeeJobTitleService) {}
   
   ngOnInit() {
     this.loadJobTitles();
   }
   
   loadJobTitles() {
     this.isLoading = true;
     this.jobTitleService.getAllEmployeeStations().subscribe({
       next: (response) => {
         if (response.success && response.result?.items) {
           this.jobTitles = response.result.items;
           this.pageChanged({
             pageIndex: 0,
             pageSize: this.pageSize,
             length: this.jobTitles.length
           } as PageEvent);
         }
         this.isLoading = false;
       },
       error: (error) => {
         console.error('Error loading job titles:', error);
         this.isLoading = false;
       }
     });
   }
   
   pageChanged(event: PageEvent) {
     this.paginator.pageIndex = event.pageIndex;
     this.paginator.pageSize = event.pageSize;
     const startIndex = event.pageIndex * event.pageSize;
     const endIndex = startIndex + event.pageSize;
     this.pagedItems = this.jobTitles.slice(startIndex, endIndex);
   }
   
     viewDetails(jobTitle: any) {
       console.log('View details:', jobTitle);
       // Implement view details logic
     }
   
     exportJobTitle(jobTitle: any) {
       console.log('Export job title:', jobTitle);
       // Implement export logic
     }
   
     get Math() {
       return Math;
     }
}