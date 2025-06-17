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
import { TaskService } from '../../../Services/task.service';

@Component({
  selector: 'app-organization-task',
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
  templateUrl: './organization-task.component.html',
  styleUrl: './organization-task.component.scss'
})
export class OrganizationTaskComponent {
  filterForm!: FormGroup;

  // Dropdown options
  projects = [
    { id: 1, name: 'ERP Implementation' },
    { id: 2, name: 'Network Upgrade' },
    { id: 3, name: 'HR Portal Development' },
    { id: 4, name: 'Financial System Audit' }
  ];

  statuses = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];

  taskModes = ['Individual', 'Team', 'Automated'];

  flags = ['Red', 'Yellow', 'Green'];

  // Sample data
// Remove the static tasksData and update the initialization
tasksData: any[] = [];
dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  totalCount: number = this.tasksData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  // dataSource: MatTableDataSource<any> = new MatTableDataSource(this.tasksData);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTasks();
    this.dataSource = new MatTableDataSource(this.tasksData);
  }

  loadTasks(params?: any): void {
  this.taskService.getAllTasks(params).subscribe({
    next: (response) => {
      // Assuming the API returns data in response.result.items
      this.tasksData = response.result?.items || [];
      this.dataSource.data = this.tasksData;
      this.totalCount = response.result?.totalCount || this.tasksData.length;
    },
    error: (error) => {
      console.error('Error loading tasks:', error);
      this.snackBar.open('Failed to load tasks', 'Close', { duration: 3000 });
    }
  });
}

  initForm() {
    this.filterForm = this.fb.group({
      project: [''],
      taskName: [''],
      status: [''],
      active: [''],
      taskMode: [''],
      flag: ['']
    });
  }

  // applyFilters() {
  //   const formValues = this.filterForm.value;
  //   let filteredData = [...this.tasksData];

  //   if (formValues.project) {
  //     filteredData = filteredData.filter(task => 
  //       task.project === this.projects.find(p => p.id === formValues.project)?.name
  //     );
  //   }

  //   if (formValues.taskName) {
  //     filteredData = filteredData.filter(task => 
  //       task.name.toLowerCase().includes(formValues.taskName.toLowerCase())
  //     );
  //   }

  //   if (formValues.status) {
  //     filteredData = filteredData.filter(task => 
  //       task.status === formValues.status
  //     );
  //   }

  //   if (formValues.active) {
  //     const isActive = formValues.active === 'true';
  //     filteredData = filteredData.filter(task => 
  //       task.active === isActive
  //     );
  //   }

  //   if (formValues.taskMode) {
  //     filteredData = filteredData.filter(task => 
  //       task.mode === formValues.taskMode
  //     );
  //   }

  //   if (formValues.flag) {
  //     filteredData = filteredData.filter(task => 
  //       task.flag === formValues.flag
  //     );
  //   }

  //   this.dataSource.data = filteredData;
  //   this.totalCount = filteredData.length;
  //   this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  // }

  applyFilters() {
  const formValues = this.filterForm.value;
  const params: any = {
    skipCount: this.pageIndex * this.pageSize,
    maxResultCount: this.pageSize
  };

  // Map form values to API parameters
  if (formValues.project) {
    params.projectId = formValues.project;
  }

  if (formValues.taskName) {
    params.name = formValues.taskName;
  }

  if (formValues.status) {
    params.status = formValues.status;
  }

  if (formValues.active) {
    params.isActive = formValues.active === 'true';
  }

  if (formValues.taskMode) {
    params.mode = formValues.taskMode;
  }

  if (formValues.flag) {
    params.flag = formValues.flag;
  }

  this.loadTasks(params);
  this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
}
  
  // clearFilters() {
  //   this.filterForm.reset();
  //   this.dataSource.data = this.tasksData;
  //   this.totalCount = this.tasksData.length;
  //   this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  // }

  // onPageChange(event: PageEvent) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  // }

  clearFilters() {
  this.filterForm.reset();
  this.pageIndex = 0;
  this.loadTasks({
    skipCount: 0,
    maxResultCount: this.pageSize
  });
  this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
}

  onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  
  // Apply current filters with new pagination
  const formValues = this.filterForm.value;
  const params = {
    skipCount: this.pageIndex * this.pageSize,
    maxResultCount: this.pageSize,
    ...formValues
  };
  
  this.loadTasks(params);
}

  viewTask(id: number): void {
    const task = this.tasksData.find(t => t.id === id);
    this.snackBar.open(`Viewing task ${id}`, 'Close', { duration: 2000 });
  }

  editTask(id: number) {
    this.router.navigate(['/organization/tasks/edit', id]);
  }

  toggleTaskStatus(task: any) {
    task.active = !task.active;
    this.snackBar.open(`Status changed to ${task.active ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewTask() {
    this.router.navigate(['/organization-dashboard/task/add-task']);
  }

  showDetails(task: any) {
    this.snackBar.open(task.details, 'Close', { duration: 5000 });
  }
}