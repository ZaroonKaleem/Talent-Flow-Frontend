import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
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
import { finalize } from 'rxjs/operators';
import { ProjectService } from '../../../Services/project.service';

@Component({
  selector: 'app-organization-project',
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
  templateUrl: './organization-project.component.html',
  styleUrl: './organization-project.component.scss'
})
export class OrganizationProjectComponent implements OnInit {
  filterForm!: FormGroup;
  isLoading = false;
  isDataLoading = false;

  // Dropdown options (now fetched from services)
  stations: any[] = [];
  departments: any[] = [];
  subDepartments: any[] = [];
  employeeGroups: any[] = [];
  employees: any[] = [];
  customers: any[] = [];
  projectManagers: any[] = [];
  projectCoordinators: any[] = [];

  years = ['2023', '2022', '2021', '2024', '2025'];
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
  statuses = ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];
  projectModes = ['Onsite', 'Remote', 'Hybrid'];
  flags = ['Red', 'Yellow', 'Green'];

  // Projects data
  projectsData: any[] = [];
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
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    this.loadProjects();
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      department: [''],
      subDepartment: [''],
      employeeGroup: [''],
      employee: [''],
      customer: [''],
      projectName: [''],
      year: [''],
      month: [''],
      status: [''],
      active: [''],
      projectManager: [''],
      projectCoordinator: [''],
      projectMode: [''],
      flag: ['']
    });
  }

  loadDropdownData() {
    this.isLoading = true;
    // In a real app, these would come from respective services
    // For now we'll keep the mock data
    this.stations = [
      { id: 1, name: 'Headquarters' },
      { id: 2, name: 'Regional Office East' },
      { id: 3, name: 'Regional Office West' },
      { id: 4, name: 'Field Office North' },
      { id: 5, name: 'Field Office South' }
    ];

    this.departments = [
      { id: 1, name: 'Human Resources' },
      { id: 2, name: 'Information Technology' },
      { id: 3, name: 'Finance' },
      { id: 4, name: 'Operations' }
    ];

    // ... other dropdown initializations
    this.isLoading = false;
  }

  loadProjects() {
    this.isDataLoading = true;
    this.projectService.getAllProjects({
      skipCount: this.pageIndex * this.pageSize,
      maxResultCount: this.pageSize
    }).pipe(
      finalize(() => this.isDataLoading = false)
    ).subscribe({
      next: (response: { items: any[]; totalCount: number; }) => {
        this.projectsData = response.items;
        this.totalCount = response.totalCount;
        this.dataSource.data = this.transformProjectData(this.projectsData);
      },
      error: (err: any) => {
        this.snackBar.open('Failed to load projects', 'Close', { duration: 3000 });
        console.error('Error loading projects:', err);
      }
    });
  }

  // Transform API data to match our table structure
  private transformProjectData(projects: any[]): any[] {
    return projects.map(project => ({
      id: project.id,
      name: project.name,
      customer: this.getCustomerName(project.clientCustomerId),
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
      budget: project.budgetAmount,
      manager: this.getManagerName(project.projectManagerId),
      coordinator: this.getCoordinatorName(project.projectCoordinatorId),
      active: true, // You might need to add this to your API model
      details: project.description,
      status: this.determineStatus(project.startDate, project.endDate),
      station: this.getStationNames(project.employeeStationIds),
      department: this.getDepartmentNames(project.departmentIds),
      flag: this.determineFlag(project.startDate, project.endDate)
    }));
  }

  // Helper methods for data transformation
  private getCustomerName(id: number): string {
    const customer = this.customers.find(c => c.id === id);
    return customer ? customer.name : 'Unknown';
  }

  private getManagerName(id: number): string {
    const manager = this.projectManagers.find(m => m.id === id);
    return manager ? manager.name : 'Unknown';
  }

  private getCoordinatorName(id: number): string {
    const coordinator = this.projectCoordinators.find(c => c.id === id);
    return coordinator ? coordinator.name : 'Unknown';
  }

  private getStationNames(ids: number[]): string {
    return ids.map(id => {
      const station = this.stations.find(s => s.id === id);
      return station ? station.name : 'Unknown';
    }).join(', ');
  }

  private getDepartmentNames(ids: number[]): string {
    return ids.map(id => {
      const dept = this.departments.find(d => d.id === id);
      return dept ? dept.name : 'Unknown';
    }).join(', ');
  }

  private determineStatus(startDate: string, endDate: string): string {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'Planning';
    if (now > end) return 'Completed';
    return 'In Progress';
  }

  private determineFlag(startDate: string, endDate: string): string {
    const now = new Date();
    const end = new Date(endDate);
    const timeLeft = end.getTime() - now.getTime();
    const daysLeft = timeLeft / (1000 * 60 * 60 * 24);

    if (daysLeft < 7) return 'Red';
    if (daysLeft < 30) return 'Yellow';
    return 'Green';
  }

  applyFilters() {
    // This would ideally call the API with filter parameters
    // For now we'll filter client-side as before
    const formValues = this.filterForm.value;
    let filteredData = [...this.projectsData];

    // ... existing filter logic ...

    this.dataSource.data = this.transformProjectData(filteredData);
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.loadProjects(); // Reload original data
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProjects();
  }

  viewProject(id: number): void {
    // this.projectService.getProjectById(id).subscribe({
    //   next: (project) => {
    //     this.dialog.open(ProjectDetailsDialog, {
    //       data: project
    //     });
    //   },
    //   error: (err) => {
    //     this.snackBar.open('Failed to load project details', 'Close', { duration: 3000 });
    //   }
    // });
  }

  editProject(id: number) {
    this.router.navigate(['/organization/projects/edit', id]);
  }

  toggleProjectStatus(project: any) {
    const updatedProject = { ...project, active: !project.active };
    this.projectService.updateProject(updatedProject).subscribe({
      next: () => {
        this.snackBar.open(`Project status updated`, 'Close', { duration: 2000 });
        this.loadProjects();
      },
      error: (err: any) => {
        this.snackBar.open('Failed to update project status', 'Close', { duration: 3000 });
      }
    });
  }

  addNewProject() {
    this.router.navigate(['/organization/projects/add']);
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
          this.loadProjects();
        },
        error: (err: any) => {
          this.snackBar.open('Failed to delete project', 'Close', { duration: 3000 });
        }
      });
    }
  }
}