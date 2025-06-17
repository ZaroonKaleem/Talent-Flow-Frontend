import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { AnnouncementService } from '../../../../Services/announcement.service';
import { DropdownService } from '../../../../Services/dropdowns.service';
import { TaskService } from '../../../../Services/task.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent implements OnInit {
   taskForm: FormGroup;
   isSubmitting = false;
   selectedFile: File | null = null;
 
   // Dropdown data
   Project: any[] = [];
   employeeStatuses: any[] = [];
   genders: any[] = [];
   stations: any[] = [];
   departments: any[] = [];
   employeeGroups: any[] = [];
   designations: any[] = [];
   employees: any[] = [];
   attachmentOptions = [
     { id: 0, name: 'None' },
     { id: 1, name: 'File Upload' },
     { id: 2, name: 'External Link' }
   ];
 
   constructor(
     private fb: FormBuilder,
     private dropdownService: DropdownService,
     private announcementService: AnnouncementService,
     private snackBar: MatSnackBar,
     private router: Router,
     private taskService: TaskService
   ) {
 this.taskForm = this.fb.group({
   name: ['', Validators.required],
   projectId: ['', Validators.required],
   announcementTypeId: ['', Validators.required],
   displayStartDate: ['', Validators.required],
   displayEndDate: ['', Validators.required],
   employeeStatusId: [''],
   genderId: [''],
   employeeStationIds: [[]],
   departmentIds: [[]],
   employeeGroupIds: [[]],
   designationIds: [[]],
   exemptedEmployeeIds: [[]],
   attachmentOption: [0],
   attachmentPath: [''],
   description: ['']
 });
   }
 
   ngOnInit(): void {
     this.loadDropdownData();
   }
 
   loadDropdownData(): void {
     const dropdowns = [
       'Project',
       'Department',
       'EmployeeStation'
     ];
 
     this.dropdownService.getDropdownData(dropdowns).subscribe({
       next: (response) => {
         this.Project = response.result.find((r: { target: string; }) => r.target === 'Project')?.data.items || [];
         this.stations = response.result.find((r: { target: string; }) => r.target === 'EmployeeStation')?.data.items || [];
         this.departments = response.result.find((r: { target: string; }) => r.target === 'Department')?.data.items || [];
        },
       error: (error) => {
         console.error('Error loading dropdown data:', error);
         this.snackBar.open('Failed to load dropdown data', 'Close', { duration: 3000 });
       }
     });
   }
 
   onFileSelected(event: any): void {
     this.selectedFile = event.target.files[0];
     this.taskForm.patchValue({
       attachmentPath: this.selectedFile?.name || ''
     });
   }
 
   onSubmit(): void {
     if (this.taskForm.invalid) {
       return;
     }
 
     this.isSubmitting = true;
     const formData = this.taskForm.value;
 
     // Format dates to ISO string
     formData.displayStartDate = new Date(formData.displayStartDate).toISOString();
     formData.displayEndDate = new Date(formData.displayEndDate).toISOString();
 
     this.announcementService.createAnnouncement(formData).subscribe({
       next: (response) => {
         this.snackBar.open('Announcement created successfully', 'Close', { duration: 3000 });
         this.router.navigate(['/announcements']);
       },
       error: (error) => {
         console.error('Error creating announcement:', error);
         this.snackBar.open('Failed to create announcement', 'Close', { duration: 3000 });
         this.isSubmitting = false;
       },
       complete: () => {
         this.isSubmitting = false;
       }
     });
   }
 
   onCancel(): void {
     this.router.navigate(['/organization-dashboard/announcements']);
   }
  }