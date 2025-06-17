// import { CommonModule } from '@angular/common';
// import { Component, ViewChild } from '@angular/core';
// import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDialog } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatMenu, MatMenuModule } from '@angular/material/menu';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { Router } from '@angular/router';
// import { finalize } from 'rxjs';
// import { LoaderService } from '../../../shared/loader.service';
// import { OrganizationService } from '../../../Services/organization.service';

// @Component({
//   selector: 'app-organization-announcement',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     MatSelectModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     MatIconModule,
//     MatCheckboxModule,
//     MatPaginator,
//     MatMenu,
//     MatMenuModule
//   ],
//   templateUrl: './organization-announcement.component.html',
//   styleUrl: './organization-announcement.component.scss'
// })
// export class OrganizationAnnouncementComponent {
//   filterForm!: FormGroup;

//   // Dropdown options
//   announcementTitles = [
//     { id: 1, title: 'Company Policy Update' },
//     { id: 2, title: 'Holiday Schedule' },
//     { id: 3, title: 'System Maintenance' },
//     { id: 4, title: 'Team Building Event' }
//   ];

//   years = [
//     { id: 1, year: '2023' },
//     { id: 2, year: '2022' },
//     { id: 3, year: '2021' }
//   ];

//   months = [
//     { id: 1, name: 'January' },
//     { id: 2, name: 'February' },
//     { id: 3, name: 'March' },
//     { id: 4, name: 'April' },
//     { id: 5, name: 'May' },
//     { id: 6, name: 'June' },
//     { id: 7, name: 'July' },
//     { id: 8, name: 'August' },
//     { id: 9, name: 'September' },
//     { id: 10, name: 'October' },
//     { id: 11, name: 'November' },
//     { id: 12, name: 'December' }
//   ];

//   announcementTypes = [
//     { id: 1, type: 'Policy Update' },
//     { id: 2, type: 'Event' },
//     { id: 3, type: 'Maintenance' },
//     { id: 4, type: 'General' }
//   ];

//   flags = ['Red', 'Yellow', 'Green'];

//   // Static announcement data
//   announcementsData = [
//     {
//       id: 1,
//       title: 'Company Policy Update',
//       displayStartDate: new Date('2023-06-01'),
//       displayEndDate: new Date('2023-06-30'),
//       announcementType: 'Policy Update',
//       addedOn: new Date('2023-05-25'),
//       modifiedOn: new Date('2023-05-28'),
//       details: 'Updated company policies regarding remote work',
//       isActive: true
//     },
//     {
//       id: 2,
//       title: 'Holiday Schedule',
//       displayStartDate: new Date('2023-07-01'),
//       displayEndDate: new Date('2023-07-31'),
//       announcementType: 'Event',
//       addedOn: new Date('2023-06-15'),
//       modifiedOn: new Date('2023-06-20'),
//       details: 'List of company holidays for the second half of the year',
//       isActive: true
//     },
//     {
//       id: 3,
//       title: 'System Maintenance',
//       displayStartDate: new Date('2023-06-10'),
//       displayEndDate: new Date('2023-06-11'),
//       announcementType: 'Maintenance',
//       addedOn: new Date('2023-06-05'),
//       modifiedOn: new Date('2023-06-05'),
//       details: 'Planned system downtime for maintenance',
//       isActive: false
//     },
//     {
//       id: 4,
//       title: 'Team Building Event',
//       displayStartDate: new Date('2023-07-15'),
//       displayEndDate: new Date('2023-07-15'),
//       announcementType: 'Event',
//       addedOn: new Date('2023-06-20'),
//       modifiedOn: new Date('2023-06-25'),
//       details: 'Annual team building event at the company retreat',
//       isActive: true
//     }
//   ];

//   totalCount: number = this.announcementsData.length;
//   pageSize: number = 10;
//   pageIndex: number = 0;

//   dataSource: MatTableDataSource<any> = new MatTableDataSource(this.announcementsData);

//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar,
//     private loaderService: LoaderService,
//     private OrganizationService: OrganizationService
//   ) {}

//   ngOnInit(): void {
//     this.initForm();
//     this.dataSource = new MatTableDataSource(this.announcementsData);
//   }

//   initForm() {
//     this.filterForm = this.fb.group({
//       announcementTitle: [''],
//       year: [''],
//       month: [''],
//       announcementType: [''],
//       flag: ['']
//     });
//   }

//   applyFilters() {
//     const formValues = this.filterForm.value;
//     let filteredData = [...this.announcementsData];

//     if (formValues.announcementTitle) {
//       filteredData = filteredData.filter(ann => 
//         ann.title === this.announcementTitles.find(at => at.id === formValues.announcementTitle)?.title
//       );
//     }

//     if (formValues.year) {
//       filteredData = filteredData.filter(ann => 
//         ann.displayStartDate.getFullYear().toString() === this.years.find(y => y.id === formValues.year)?.year
//       );
//     }

//     if (formValues.month) {
//       filteredData = filteredData.filter(ann => 
//         (ann.displayStartDate.getMonth() + 1) === formValues.month
//       );
//     }

//     if (formValues.announcementType) {
//       filteredData = filteredData.filter(ann => 
//         ann.announcementType === this.announcementTypes.find(at => at.id === formValues.announcementType)?.type
//       );
//     }

//     this.dataSource.data = filteredData;
//     this.totalCount = filteredData.length;
//     this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
//   }

//   clearFilters() {
//     this.filterForm.reset();
//     this.dataSource.data = this.announcementsData;
//     this.totalCount = this.announcementsData.length;
//     this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
//   }

//   onPageChange(event: PageEvent) {
//     this.pageIndex = event.pageIndex;
//     this.pageSize = event.pageSize;
//   }

//   loadAnnouncements(params?: any) {
//     this.loaderService.show();
//     this.OrganizationService.getAllAnnouncements(params)
//       .pipe(
//         finalize(() =>
//         this.loaderService.hide()
//         )
//       )
//       .subscribe({
//         next: (response) => {
//           // Assuming the API returns an array of announcements
//           // Adjust this based on your actual API response structure
//           this.announcementsData = response.result.items || response.result || response;
//           this.totalCount = response.result.totalCount || this.announcementsData.length;
//           this.dataSource.data = this.announcementsData;
//         },
//         error: (error) => {
//           console.error('Error loading announcements:', error);
//           this.snackBar.open('Failed to load announcements', 'Close', { duration: 3000 });
//         }
//       });
//   }

//   viewAnnouncement(id: number): void {
//     const announcement = this.announcementsData.find(a => a.id === id);
//     this.snackBar.open(`Viewing announcement ${id}`, 'Close', { duration: 2000 });
//   }

//   editAnnouncement(id: number) {
//     this.router.navigate(['/organization/announcements/edit', id]);
//   }

//   toggleAnnouncementStatus(announcement: any) {
//     announcement.isActive = !announcement.isActive;
//     this.snackBar.open(`Status changed to ${announcement.isActive ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
//   }

//   addNewAnnouncement() {
//     this.router.navigate(['/organization/announcements/add']);
//   }

//   showDetails(announcement: any) {
//     this.snackBar.open(announcement.details, 'Close', { duration: 5000 });
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from '../../../shared/loader.service';
import { OrganizationService } from '../../../Services/organization.service';
import { DropdownService } from '../../../Services/dropdowns.service';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { AnnouncementService } from '../../../Services/announcement.service';

@Component({
  selector: 'app-organization-announcement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginator,
    MatMenu,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './organization-announcement.component.html',
  styleUrl: './organization-announcement.component.scss'
})
export class OrganizationAnnouncementComponent implements OnInit {
  filterForm!: FormGroup;

  // Dropdown options
  announcementTitles = [
    { id: 1, title: 'Company Policy Update' },
    { id: 2, title: 'Holiday Schedule' },
    { id: 3, title: 'System Maintenance' },
    { id: 4, title: 'Team Building Event' }
  ];

  years = [
    { id: 1, year: '2025' },
    { id: 2, year: '2024' },
    { id: 3, year: '2023' }
  ];

  months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];

  announcementTypes = [
    { id: 1, type: 'Policy Update' },
    { id: 2, type: 'Event' },
    { id: 3, type: 'Maintenance' },
    { id: 4, type: 'General' }
  ];

  flags = ['Mark', 'Unmark'];

  announcementsData: any[] = [];
  totalCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private organizationService: OrganizationService,
    private dropdownService: DropdownService,
    private AnnouncementService: AnnouncementService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    this.loadAnnouncements();
  }

  initForm() {
    this.filterForm = this.fb.group({
      announcementTitle: [''],
      year: [''],
      month: [''],
      announcementType: [''],
      flag: ['']
    });
  }

  loadDropdownData() {
    // Get both dropdowns in a single API call
    this.dropdownService.getDropdownData(['Announcement', 'AnnouncementType'])
      .subscribe({
        next: (response) => {
          // Process Announcement titles
          const announcementData = response.result.find((r: { target: string; }) => r.target === 'Announcement');
          this.announcementTitles = announcementData?.data.items.map((item: any) => ({
            id: item.id,
            title: item.name
          })) || [];

          // Process Announcement types
          const announcementTypeData = response.result.find((r: { target: string; }) => r.target === 'AnnouncementType');
          this.announcementTypes = announcementTypeData?.data.items.map((item: any) => ({
            id: item.id,
            type: item.name
          })) || [];
        },
        error: (error) => {
          console.error('Error loading dropdown data:', error);
          // You might want to show a user-friendly error message here
        }
      });
  }

showDetails(announcement: any) {
  this.dialog.open(AnnouncementDetailsComponent, {
    width: '600px',
    data: announcement
  });
}
  // loadAnnouncements(params?: any) {
  //   this.loaderService.show();
  //   this.organizationService.getAllAnnouncements(params)
  //     .pipe(
  //       finalize(() => this.loaderService.hide())
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         this.announcementsData = response.result.items.map((item: any) => ({
  //           ...item,
  //           // Calculate isActive based on current date and display dates
  //           isActive: this.isAnnouncementActive(item.displayStartDate, item.displayEndDate)
  //         }));
  //         this.totalCount = response.result.totalCount;
  //         this.dataSource.data = this.announcementsData;
  //       },
  //       error: (error) => {
  //         console.error('Error loading announcements:', error);
  //         this.snackBar.open('Failed to load announcements', 'Close', { duration: 3000 });
  //       }
  //     });
  // }

  private isAnnouncementActive(startDate: string, endDate: string): boolean {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
  }

  // applyFilters() {
  //   const formValues = this.filterForm.value;
  //   const params: any = {
  //     skipCount: this.pageIndex * this.pageSize,
  //     maxResultCount: this.pageSize
  //   };

  //   if (formValues.announcementTitle) {
  //     params.name = this.announcementTitles.find(at => at.id === formValues.announcementTitle)?.title;
  //   }

  //   if (formValues.year) {
  //     params.year = this.years.find(y => y.id === formValues.year)?.year;
  //   }

  //   if (formValues.month) {
  //     params.month = formValues.month;
  //   }

  //   if (formValues.announcementType) {
  //     params.announcementTypeName = this.announcementTypes.find(at => at.id === formValues.announcementType)?.type;
  //   }

  //   this.loadAnnouncements(params);
  //   this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  // }
applyFilters() {
  const formValues = this.filterForm.value;
  const params: any = {
    skipCount: this.pageIndex * this.pageSize,
    maxResultCount: this.pageSize
  };

  // Build filters only if values are selected
  if (formValues.announcementTitle) {
    params.name = this.announcementTitles.find(at => at.id === formValues.announcementTitle)?.title;
  }

  if (formValues.year) {
    params.year = this.years.find(y => y.id === formValues.year)?.year;
  }

  if (formValues.month) {
    params.month = formValues.month;
  }

  if (formValues.announcementType) {
    params.announcementTypeName = this.announcementTypes.find(at => at.id === formValues.announcementType)?.type;
  }

  if (formValues.flag) {
    params.flag = formValues.flag;
  }

  this.loadAnnouncements(params);
}

loadAnnouncements(params?: any) {
  this.loaderService.show();
  this.organizationService.getAllAnnouncements(params)
    .pipe(
      finalize(() => this.loaderService.hide())
    )
    .subscribe({
      next: (response) => {
        if (response.result?.items?.length > 0) {
          this.announcementsData = response.result.items.map((item: any) => ({
            ...item,
            isActive: this.isAnnouncementActive(item.displayStartDate, item.displayEndDate)
          }));
          this.totalCount = response.result.totalCount;
          this.snackBar.open('Filters applied successfully', 'Close', { duration: 2000 });
        } else {
          // Clear data when no results found
          this.announcementsData = [];
          this.totalCount = 0;
          this.snackBar.open('No announcements found with these filters', 'Close', { duration: 3000 });
        }
        this.dataSource.data = this.announcementsData;
      },
      error: (error) => {
        console.error('Error loading announcements:', error);
        this.snackBar.open('Failed to load announcements', 'Close', { duration: 3000 });
      }
    });
}

  clearFilters() {
    this.filterForm.reset();
    this.loadAnnouncements({
      skipCount: this.pageIndex * this.pageSize,
      maxResultCount: this.pageSize
    });
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAnnouncements({
      skipCount: this.pageIndex * this.pageSize,
      maxResultCount: this.pageSize
    });
  }

  viewAnnouncement(id: number): void {
    const announcement = this.announcementsData.find(a => a.id === id);
    this.snackBar.open(`Viewing announcement ${id}: ${announcement?.name}`, 'Close', { duration: 2000 });
  }

  editAnnouncement(id: number) {
    this.router.navigate(['/organization/announcements/edit', id]);
  }

  toggleAnnouncementStatus(announcement: any) {
    announcement.isActive = !announcement.isActive;
    this.snackBar.open(`Status changed to ${announcement.isActive ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewAnnouncement() {
    this.router.navigate(['/organization-dashboard/announcements/add-announcement']);
  }

  // Add this method to your component class
deleteAnnouncement(id: number) {
  if (confirm('Are you sure you want to delete this announcement?')) {
    this.AnnouncementService.deleteAnnouncement(id).subscribe({
      next: () => {
        this.snackBar.open('Announcement deleted successfully', 'Close', { duration: 3000 });
        // Refresh your announcements list or navigate away
        this.loadAnnouncements(); // Or whatever method refreshes your list
      },
      error: (error) => {
        console.error('Error deleting announcement:', error);
        this.snackBar.open('Failed to delete announcement', 'Close', { duration: 3000 });
      }
    });
  }
}

  // showDetails(announcement: any) {
  //   this.snackBar.open(announcement.description || 'No details available', 'Close', { duration: 5000 });
  // }

  formatList(items: any[]): string {
    return items.map(item => item.name).join(', ');
  }
}