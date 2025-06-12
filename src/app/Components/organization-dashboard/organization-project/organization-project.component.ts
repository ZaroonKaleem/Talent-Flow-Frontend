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
export class OrganizationProjectComponent {
  filterForm!: FormGroup;

  // Dropdown options
  stations = [
    { id: 1, name: 'Headquarters' },
    { id: 2, name: 'Regional Office East' },
    { id: 3, name: 'Regional Office West' },
    { id: 4, name: 'Field Office North' },
    { id: 5, name: 'Field Office South' }
  ];

  departments = [
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Operations' }
  ];

  subDepartments = [
    { id: 1, name: 'Recruitment' },
    { id: 2, name: 'Payroll' },
    { id: 3, name: 'Network' },
    { id: 4, name: 'Development' }
  ];

  employeeGroups = [
    { id: 1, name: 'All Employees' },
    { id: 2, name: 'Administrative Staff' },
    { id: 3, name: 'Technical Staff' },
    { id: 4, name: 'Contractual Staff' }
  ];

  employees = [
    { id: 1, name: 'John Doe', code: 'EMP001' },
    { id: 2, name: 'Jane Smith', code: 'EMP002' },
    { id: 3, name: 'Robert Johnson', code: 'EMP003' },
    { id: 4, name: 'Emily Davis', code: 'EMP004' }
  ];

  customers = [
    { id: 1, name: 'ABC Corporation' },
    { id: 2, name: 'XYZ Enterprises' },
    { id: 3, name: 'Global Solutions' },
    { id: 4, name: 'Tech Innovators' }
  ];

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

  projectManagers = [
    { id: 1, name: 'Michael Brown' },
    { id: 2, name: 'Sarah Wilson' },
    { id: 3, name: 'David Taylor' }
  ];

  projectCoordinators = [
    { id: 1, name: 'Lisa Anderson' },
    { id: 2, name: 'James Martinez' },
    { id: 3, name: 'Jennifer Garcia' }
  ];

  projectModes = ['Onsite', 'Remote', 'Hybrid'];

  flags = ['Red', 'Yellow', 'Green'];

  // Sample data
  projectsData = [
    {
      id: 1,
      name: 'ERP Implementation',
      customer: 'ABC Corporation',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-06-30'),
      budget: 150000,
      employeeCount: 8,
      manager: 'Michael Brown',
      coordinator: 'Lisa Anderson',
      mode: 'Hybrid',
      addedOn: new Date('2022-12-10'),
      modifiedOn: new Date('2023-05-15'),
      active: true,
      details: 'Enterprise Resource Planning system implementation',
      status: 'In Progress',
      station: 'Headquarters',
      department: 'Information Technology',
      subDepartment: 'Development',
      employeeGroup: 'Technical Staff',
      flag: 'Green'
    },
    {
      id: 2,
      name: 'Network Upgrade',
      customer: 'XYZ Enterprises',
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-05-31'),
      budget: 75000,
      employeeCount: 4,
      manager: 'Sarah Wilson',
      coordinator: 'James Martinez',
      mode: 'Onsite',
      addedOn: new Date('2023-02-15'),
      modifiedOn: new Date('2023-04-20'),
      active: true,
      details: 'Complete network infrastructure upgrade',
      status: 'Completed',
      station: 'Regional Office East',
      department: 'Information Technology',
      subDepartment: 'Network',
      employeeGroup: 'Technical Staff',
      flag: 'Yellow'
    },
    {
      id: 3,
      name: 'HR Portal Development',
      customer: 'Global Solutions',
      startDate: new Date('2023-04-01'),
      endDate: new Date('2023-09-30'),
      budget: 95000,
      employeeCount: 6,
      manager: 'David Taylor',
      coordinator: 'Jennifer Garcia',
      mode: 'Remote',
      addedOn: new Date('2023-03-10'),
      modifiedOn: new Date('2023-07-15'),
      active: false,
      details: 'Custom HR portal development with employee self-service',
      status: 'On Hold',
      station: 'Field Office North',
      department: 'Human Resources',
      subDepartment: 'Recruitment',
      employeeGroup: 'Administrative Staff',
      flag: 'Red'
    },
    {
      id: 4,
      name: 'Financial System Audit',
      customer: 'Tech Innovators',
      startDate: new Date('2023-05-15'),
      endDate: new Date('2023-07-31'),
      budget: 50000,
      employeeCount: 3,
      employees:'',
      manager: 'Michael Brown',
      coordinator: 'Lisa Anderson',
      mode: 'Hybrid',
      addedOn: new Date('2023-04-20'),
      modifiedOn: new Date('2023-06-10'),
      active: true,
      details: 'Annual financial systems audit and compliance check',
      status: 'In Progress',
      station: 'Headquarters',
      department: 'Finance',
      subDepartment: 'Payroll',
      employeeGroup: 'Administrative Staff',
      flag: 'Green'
    }
  ];

  totalCount: number = this.projectsData.length;
  pageSize: number = 10;
  pageIndex: number = 0;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.projectsData);

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
    this.dataSource = new MatTableDataSource(this.projectsData);
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

  applyFilters() {
    const formValues = this.filterForm.value;
    let filteredData = [...this.projectsData];

    if (formValues.station) {
      filteredData = filteredData.filter(project => 
        project.station === this.stations.find(s => s.id === formValues.station)?.name
      );
    }

    if (formValues.department) {
      filteredData = filteredData.filter(project => 
        project.department === this.departments.find(d => d.id === formValues.department)?.name
      );
    }

    if (formValues.subDepartment) {
      filteredData = filteredData.filter(project => 
        project.subDepartment === this.subDepartments.find(sd => sd.id === formValues.subDepartment)?.name
      );
    }

    if (formValues.employeeGroup) {
      filteredData = filteredData.filter(project => 
        project.employeeGroup === this.employeeGroups.find(g => g.id === formValues.employeeGroup)?.name
      );
    }

    if (formValues.employee) {
      filteredData = filteredData.filter(project => 
        project.employees?.includes(this.employees.find(e => e.id === formValues.employee)?.name || '')
      );
    }

    if (formValues.customer) {
      filteredData = filteredData.filter(project => 
        project.customer === this.customers.find(c => c.id === formValues.customer)?.name
      );
    }

    if (formValues.projectName) {
      filteredData = filteredData.filter(project => 
        project.name.toLowerCase().includes(formValues.projectName.toLowerCase())
      );
    }

    if (formValues.year) {
      filteredData = filteredData.filter(project => 
        project.startDate.getFullYear().toString() === formValues.year ||
        project.endDate.getFullYear().toString() === formValues.year
      );
    }

    if (formValues.month) {
      filteredData = filteredData.filter(project => 
        (project.startDate.getMonth() + 1) === formValues.month ||
        (project.endDate.getMonth() + 1) === formValues.month
      );
    }

    if (formValues.status) {
      filteredData = filteredData.filter(project => 
        project.status === formValues.status
      );
    }

    if (formValues.active) {
      const isActive = formValues.active === 'true';
      filteredData = filteredData.filter(project => 
        project.active === isActive
      );
    }

    if (formValues.projectManager) {
      filteredData = filteredData.filter(project => 
        project.manager === this.projectManagers.find(pm => pm.id === formValues.projectManager)?.name
      );
    }

    if (formValues.projectCoordinator) {
      filteredData = filteredData.filter(project => 
        project.coordinator === this.projectCoordinators.find(pc => pc.id === formValues.projectCoordinator)?.name
      );
    }

    if (formValues.projectMode) {
      filteredData = filteredData.filter(project => 
        project.mode === formValues.projectMode
      );
    }

    if (formValues.flag) {
      filteredData = filteredData.filter(project => 
        project.flag === formValues.flag
      );
    }

    this.dataSource.data = filteredData;
    this.totalCount = filteredData.length;
    this.snackBar.open('Filters applied', 'Close', { duration: 2000 });
  }

  clearFilters() {
    this.filterForm.reset();
    this.dataSource.data = this.projectsData;
    this.totalCount = this.projectsData.length;
    this.snackBar.open('Filters cleared', 'Close', { duration: 2000 });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewProject(id: number): void {
    const project = this.projectsData.find(p => p.id === id);
    this.snackBar.open(`Viewing project ${id}`, 'Close', { duration: 2000 });
  }

  editProject(id: number) {
    this.router.navigate(['/organization/projects/edit', id]);
  }

  toggleProjectStatus(project: any) {
    project.active = !project.active;
    this.snackBar.open(`Status changed to ${project.active ? 'Active' : 'Inactive'}`, 'Close', { duration: 2000 });
  }

  addNewProject() {
    this.router.navigate(['/organization/projects/add']);
  }

  showDetails(project: any) {
    this.snackBar.open(project.details, 'Close', { duration: 5000 });
  }
}