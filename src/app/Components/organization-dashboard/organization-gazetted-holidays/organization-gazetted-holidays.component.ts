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
    MatPaginator,
    MatMenu,
    MatMenuModule
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

  // Static holiday data
  holidaysData = [
    {
      id: 1,
      title: 'New Year',
      date: new Date('2023-01-01'),
      addedOn: new Date('2022-12-15'),
      modifiedOn: new Date('2022-12-20'),
      details: 'New Year celebration holiday',
      isActive: true,
      station: 'Headquarters',
      employeeGroup: 'All Employees',
      flag: 'Red'
    },
    {
      id: 2,
      title: 'Independence Day',
      date: new Date('2023-08-14'),
      addedOn: new Date('2023-07-01'),
      modifiedOn: new Date('2023-07-05'),
      details: 'National independence day holiday',
      isActive: true,
      station: 'All Stations',
      employeeGroup: 'All Employees',
      flag: 'Red'
    },
    {
      id: 3,
      title: 'Eid-ul-Fitr',
      date: new Date('2023-04-22'),
      addedOn: new Date('2023-04-10'),
      modifiedOn: new Date('2023-04-12'),
      details: 'Religious holiday for Eid celebrations',
      isActive: true,
      station: 'All Stations',
      employeeGroup: 'All Employees',
      flag: 'Red'
    },
    {
      id: 4,
      title: 'Technical Staff Day Off',
      date: new Date('2023-05-15'),
      addedOn: new Date('2023-04-20'),
      modifiedOn: new Date('2023-04-25'),
      details: 'Special day off for technical staff only',
      isActive: true,
      station: 'Regional Office East',
      employeeGroup: 'Technical Staff',
      flag: 'Green'
    }
  ];

  totalCount: number = this.holidaysData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.holidaysData);

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
    this.dataSource = new MatTableDataSource(this.holidaysData);
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

  applyFilters() {
    const formValues = this.filterForm.value;
    let filteredData = [...this.holidaysData];

    if (formValues.station) {
      filteredData = filteredData.filter(holiday => 
        holiday.station === this.stations.find(s => s.id === formValues.station)?.name
      );
    }

    if (formValues.employeeGroup) {
      filteredData = filteredData.filter(holiday => 
        holiday.employeeGroup === this.employeeGroups.find(g => g.id === formValues.employeeGroup)?.name
      );
    }

    if (formValues.year) {
      filteredData = filteredData.filter(holiday => 
        holiday.date.getFullYear().toString() === this.years.find(y => y.id === formValues.year)?.year
      );
    }

    if (formValues.month) {
      filteredData = filteredData.filter(holiday => 
        (holiday.date.getMonth() + 1) === formValues.month
      );
    }

    if (formValues.flag) {
      filteredData = filteredData.filter(holiday => 
        holiday.flag === formValues.flag
      );
    }

    this.dataSource.data = filteredData;
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.dataSource.data = this.holidaysData;
    this.totalCount = this.holidaysData.length;
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewHoliday(id: number): void {
    const holiday = this.holidaysData.find(h => h.id === id);
    this.snackBar.open(`Viewing holiday ${id}`, 'Close', { duration: 2000 });
  }

  editHoliday(id: number) {
    this.router.navigate(['/organization/holidays/edit', id]);
  }

  toggleHolidayStatus(holiday: any) {
    holiday.isActive = !holiday.isActive;
    this.snackBar.open(`Status changed to ${holiday.isActive ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewHoliday() {
    this.router.navigate(['/organization/holidays/add']);
  }

  showDetails(holiday: any) {
    this.snackBar.open(holiday.details, 'Close', { duration: 5000 });
  }
}