import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubDepartment {
  id: number;
  name: string;
  department: string;
  head: string;
  code: string;
  addedOn: string;
  modifiedOn: string;
  active: boolean;
  addedBy: string;
}

@Component({
  selector: 'app-sub-department',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.scss']
})
export class SubDepartmentComponent {
  subDepartments: SubDepartment[] = [
    {
      id: 1,
      name: 'Web',
      department: 'IT',
      head: 'IT',
      code: '78',
      addedOn: '3/6/2024 2:34:59 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    },
    {
      id: 2,
      name: 'marketing',
      department: 'Marketing',
      head: 'Marketing',
      code: '123',
      addedOn: '3/6/2024 2:35:14 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    },
    {
      id: 3,
      name: 'growth',
      department: 'Growth',
      head: 'Growth',
      code: '231',
      addedOn: '3/6/2024 2:35:24 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    },
    {
      id: 4,
      name: 'On Page SEO',
      department: 'SEO',
      head: 'SEO',
      code: '21',
      addedOn: '3/6/2024 2:35:33 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    },
    {
      id: 5,
      name: 'Transformation',
      department: 'Transformation',
      head: 'Transformation',
      code: '21',
      addedOn: '3/6/2024 2:35:44 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    },
    {
      id: 6,
      name: 'jnr Finance',
      department: 'Finance',
      head: 'Finance',
      code: '321',
      addedOn: '3/6/2024 2:35:57 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    },
    {
      id: 7,
      name: 'founder',
      department: 'Cofounder',
      head: 'Cofounder',
      code: '213',
      addedOn: '3/6/2024 2:36:09 PM',
      modifiedOn: '--',
      active: true,
      addedBy: 'Mr-Blacky'
    }
  ];
  editSubDepartment: SubDepartment | null = null;
}