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
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GazettedHolidaysService } from '../../../Services/gazetted-holidays.service';

@Component({
  selector: 'app-organization-gazetted-holidays',
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
    MatMenuModule,
    MatPaginator
  ],
  templateUrl: './organization-gazetted-holidays.component.html',
  styleUrl: './organization-gazetted-holidays.component.scss'
})
export class OrganizationGazettedHolidaysComponent {
  filterForm!: FormGroup;

  // Dropdown options
  stations = [
    { id: 1, name: 'Headquarters' },
    { id: 2, name: 'Regional Office East' },
    { id: 3, name: 'Regional Office West' },
    { id: 4, name: 'Field Office North' },
    { id: 5, name: 'Field Office South' }
  ];

  employeeGroups = [
    { id: 1, name: 'All Employees' },
    { id: 2, name: 'Administrative Staff' },
    { id: 3, name: 'Technical Staff' },
    { id: 4, name: 'Contractual Staff' }
  ];

  years = [
    { id: 1, year: '2023' },
    { id: 2, year: '2022' },
    { id: 3, year: '2021' },
    { id: 4, year: '2024' }
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

  flags = ['Red', 'Yellow', 'Green'];

  holidays: any[] = [];
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
    private holidayService: GazettedHolidaysService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHolidays(1, this.pageSize);
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      employeeGroup: [''],
      year: [''],
      month: [''],
      flag: ['']
    });
  }

  loadHolidays(page: number, pageSize: number): void {
    this.holidayService.getAllHolidays({
      skipCount: (page - 1) * pageSize,
      maxResultCount: pageSize
    }).subscribe({
      next: (result) => {
        this.holidays = result.items;
        this.dataSource.data = result.items;
        this.totalCount = result.totalCount;
      },
      error: (err) => {
        console.error('Error loading holidays', err);
        this.snackBar.open('Failed to load holidays', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilters() {
    const formValues = this.filterForm.value;
    let params: any = {
      skipCount: this.pageIndex * this.pageSize,
      maxResultCount: this.pageSize
    };

    if (formValues.station) {
      params.stationId = formValues.station;
    }

    if (formValues.employeeGroup) {
      params.employeeGroupId = formValues.employeeGroup;
    }

    if (formValues.year) {
      params.year = this.years.find(y => y.id === formValues.year)?.year;
    }

    if (formValues.month) {
      params.month = formValues.month;
    }

    if (formValues.flag) {
      params.flag = formValues.flag;
    }

    this.holidayService.getAllHolidays(params).subscribe({
      next: (result) => {
        this.holidays = result.items;
        this.dataSource.data = result.items;
        this.totalCount = result.totalCount;
        this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error applying filters', err);
        this.snackBar.open('Failed to apply filters', 'Close', { duration: 3000 });
      }
    });
  }

  clearFilters() {
    this.filterForm.reset();
    this.loadHolidays(1, this.pageSize);
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHolidays(this.pageIndex + 1, this.pageSize);
  }

  viewHoliday(id: number): void {
    this.holidayService.getHolidayById(id).subscribe({
      next: (holiday) => {
        this.snackBar.open(`Viewing holiday: ${holiday.name}`, 'Close', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error fetching holiday', err);
        this.snackBar.open('Failed to load holiday details', 'Close', { duration: 3000 });
      }
    });
  }

  editHoliday(id: number) {
    this.router.navigate(['/organization/holidays/edit', id]);
  }

  toggleHolidayStatus(holiday: any) {
    const updatedHoliday = { ...holiday, sendEmail: !holiday.sendEmail };
    this.holidayService.updateHoliday(updatedHoliday).subscribe({
      next: () => {
        holiday.sendEmail = updatedHoliday.sendEmail;
        this.snackBar.open(`Email notification ${holiday.sendEmail ? 'enabled' : 'disabled'}`, 'Close', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error updating holiday', err);
        this.snackBar.open('Failed to update holiday status', 'Close', { duration: 3000 });
      }
    });
  }

  addNewHoliday() {
    this.router.navigate(['/organization/holidays/add']);
  }

  showDetails(holiday: any) {
    this.snackBar.open(holiday.description, 'Close', { duration: 5000 });
  }
}