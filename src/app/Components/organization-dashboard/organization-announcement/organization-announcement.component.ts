import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
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
    MatMenuModule
  ],
  templateUrl: './organization-announcement.component.html',
  styleUrl: './organization-announcement.component.scss'
})
export class OrganizationAnnouncementComponent {
  filterForm!: FormGroup;

  // Dropdown options
  announcementTitles = [
    { id: 1, title: 'Company Policy Update' },
    { id: 2, title: 'Holiday Schedule' },
    { id: 3, title: 'System Maintenance' },
    { id: 4, title: 'Team Building Event' }
  ];

  years = [
    { id: 1, year: '2023' },
    { id: 2, year: '2022' },
    { id: 3, year: '2021' }
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

  flags = ['Red', 'Yellow', 'Green'];

  // Static announcement data
  announcementsData = [
    {
      id: 1,
      title: 'Company Policy Update',
      displayStartDate: new Date('2023-06-01'),
      displayEndDate: new Date('2023-06-30'),
      announcementType: 'Policy Update',
      addedOn: new Date('2023-05-25'),
      modifiedOn: new Date('2023-05-28'),
      details: 'Updated company policies regarding remote work',
      isActive: true
    },
    {
      id: 2,
      title: 'Holiday Schedule',
      displayStartDate: new Date('2023-07-01'),
      displayEndDate: new Date('2023-07-31'),
      announcementType: 'Event',
      addedOn: new Date('2023-06-15'),
      modifiedOn: new Date('2023-06-20'),
      details: 'List of company holidays for the second half of the year',
      isActive: true
    },
    {
      id: 3,
      title: 'System Maintenance',
      displayStartDate: new Date('2023-06-10'),
      displayEndDate: new Date('2023-06-11'),
      announcementType: 'Maintenance',
      addedOn: new Date('2023-06-05'),
      modifiedOn: new Date('2023-06-05'),
      details: 'Planned system downtime for maintenance',
      isActive: false
    },
    {
      id: 4,
      title: 'Team Building Event',
      displayStartDate: new Date('2023-07-15'),
      displayEndDate: new Date('2023-07-15'),
      announcementType: 'Event',
      addedOn: new Date('2023-06-20'),
      modifiedOn: new Date('2023-06-25'),
      details: 'Annual team building event at the company retreat',
      isActive: true
    }
  ];

  totalCount: number = this.announcementsData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.announcementsData);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.dataSource = new MatTableDataSource(this.announcementsData);
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

  applyFilters() {
    const formValues = this.filterForm.value;
    let filteredData = [...this.announcementsData];

    if (formValues.announcementTitle) {
      filteredData = filteredData.filter(ann => 
        ann.title === this.announcementTitles.find(at => at.id === formValues.announcementTitle)?.title
      );
    }

    if (formValues.year) {
      filteredData = filteredData.filter(ann => 
        ann.displayStartDate.getFullYear().toString() === this.years.find(y => y.id === formValues.year)?.year
      );
    }

    if (formValues.month) {
      filteredData = filteredData.filter(ann => 
        (ann.displayStartDate.getMonth() + 1) === formValues.month
      );
    }

    if (formValues.announcementType) {
      filteredData = filteredData.filter(ann => 
        ann.announcementType === this.announcementTypes.find(at => at.id === formValues.announcementType)?.type
      );
    }

    this.dataSource.data = filteredData;
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.dataSource.data = this.announcementsData;
    this.totalCount = this.announcementsData.length;
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewAnnouncement(id: number): void {
    const announcement = this.announcementsData.find(a => a.id === id);
    this.snackBar.open(`Viewing announcement ${id}`, 'Close', { duration: 2000 });
  }

  editAnnouncement(id: number) {
    this.router.navigate(['/organization/announcements/edit', id]);
  }

  toggleAnnouncementStatus(announcement: any) {
    announcement.isActive = !announcement.isActive;
    this.snackBar.open(`Status changed to ${announcement.isActive ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewAnnouncement() {
    this.router.navigate(['/organization/announcements/add']);
  }

  showDetails(announcement: any) {
    this.snackBar.open(announcement.details, 'Close', { duration: 5000 });
  }
}