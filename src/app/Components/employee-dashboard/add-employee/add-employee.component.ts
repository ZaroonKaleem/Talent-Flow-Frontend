import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-employee',
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatList,
    MatListItem
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {

  // For contact information
   countries = [
    { id: 1, name: 'Pakistan' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'UK' }
  ];

  provinces = [
    { id: 1, name: 'Punjab' },
    { id: 2, name: 'Sindh' },
    { id: 3, name: 'KPK' }
  ];

  cities = [
    { id: 1, name: 'Lahore' },
    { id: 2, name: 'Karachi' },
    { id: 3, name: 'Islamabad' }
  ];

  areas = [
    { id: 1, name: 'Gulberg' },
    { id: 2, name: 'DHA' },
    { id: 3, name: 'Bahria Town' }
  ];

  stations = [
    { id: 1, name: 'Head Office' },
    { id: 2, name: 'Regional Office' },
    { id: 3, name: 'Branch Office' }
  ];

  departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'IT' }
  ];

  subDepartments = [
    { id: 1, name: 'Recruitment' },
    { id: 2, name: 'Payroll' },
    { id: 3, name: 'Development' }
  ];

  designations = [
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Senior Executive' },
    { id: 3, name: 'Executive' }
  ];

  divisions = [
    { id: 1, name: 'Operations' },
    { id: 2, name: 'Administration' },
    { id: 3, name: 'Technical' }
  ];

  grades = [
    { id: 1, name: 'Grade 1' },
    { id: 2, name: 'Grade 2' },
    { id: 3, name: 'Grade 3' }
  ];

  employeeStatuses = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Probation' },
    { id: 3, name: 'Inactive' }
  ];

  employeeGroups = [
    { id: 1, name: 'Permanent' },
    { id: 2, name: 'Contract' },
    { id: 3, name: 'Temporary' }
  ];

  regions = [
    { id: 1, name: 'North' },
    { id: 2, name: 'South' },
    { id: 3, name: 'East' }
  ];

  costCenters = [
    { id: 1, name: 'CC-101' },
    { id: 2, name: 'CC-102' },
    { id: 3, name: 'CC-103' }
  ];

  glClasses = [
    { id: 1, name: 'Class A' },
    { id: 2, name: 'Class B' },
    { id: 3, name: 'Class C' }
  ];

   educations: any[] = [];
  workHistory: any[] = [];
  religions = [
    { id: 1, name: 'Islam' },
    { id: 2, name: 'Christianity' },
    { id: 3, name: 'Hinduism' },
    { id: 4, name: 'Other' }
  ];

 employeeForm: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;

  // Sample data for dropdowns
  prefixes = [
    {value: 'mr', viewValue: 'Mr.'},
    {value: 'mrs', viewValue: 'Mrs.'},
    {value: 'ms', viewValue: 'Ms.'},
    {value: 'dr', viewValue: 'Dr.'}
  ];

  managers = [
    {id: 1, name: 'John Smith'},
    {id: 2, name: 'Sarah Johnson'},
    {id: 3, name: 'Michael Brown'}
  ];

  roleTemplates = [
    {id: 1, name: 'Administrator'},
    {id: 2, name: 'Manager'},
    {id: 3, name: 'Employee'},
    {id: 4, name: 'HR'}
  ];

  // Employee Document
  documents: any[] = [];
  selectedDocumentType: number | null = null;
  documentTypes = [
    { id: 1, name: 'CNIC' },
    { id: 2, name: 'Passport' },
    { id: 3, name: 'Degree' },
    { id: 4, name: 'Experience Letter' },
    { id: 5, name: 'Appointment Letter' },
    { id: 6, name: 'Other' }
  ];

  onDocumentUpload(event: any) {
    const files = event.target.files;
    if (files && files.length > 0 && this.selectedDocumentType) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert(`File ${file.name} exceeds 5MB limit`);
          continue;
        }
        
        this.documents.push({
          name: file.name,
          type: this.selectedDocumentType,
          size: file.size,
          file: file
        });
      }
    } else if (!this.selectedDocumentType) {
      alert('Please select a document type first');
    }
  }

  removeDocument(index: number) {
    this.documents.splice(index, 1);
  }

  getDocumentTypeName(typeId: number): string {
    const type = this.documentTypes.find(t => t.id === typeId);
    return type ? type.name : 'Unknown';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      // General Information
      prefix: ['mr'],
      employeeCode: ['', Validators.required],
      punchCode: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: [''],
      mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      reportsTo: [''],
      allowManualAttendance: ['no'],
      scheduledReport: ['no'],
      allowLogin: [false],
      roleTemplate: [''],
      username: [''],
      password: [''],
      sendCredentials: [false],
      photo: [null],

       // Additional Information
      maritalStatus: [''],
      gender: [''],
      dateOfBirth: [''],
      placeOfBirth: [''],
      familyCode: [''],
      religion: [''],
      address: [''],
      state: [''],
      zipCode: [''],
      emergencyContactName: [''],
      emergencyRelationship: [''],
      emergencyPhone: [''],
      cnicNo: [''],
      cnicIssueDate: [''],
      cnicExpiryDate: [''],
      eobiRegistrationNo: [''],
      eobiEntryDate: [''],
      socialSecurityNo: [''],
      passportNo: [''],
      visaNo: [''],
      visaExpiryDate: [''],
      notes: [''],

      // Contact Information
      country: [''],
      province: [''],
      city: [''],
      area: [''],
      station: [''],
      department: [''],
      subDepartment: [''],
      designation: [''],
      division: [''],
      grade: [''],
      employeeStatus: [''],
      employeeGroup: [''],
      region: [''],
      costCenter: [''],
      glClass: [''],
      joiningDate: [''],
      confirmationDate: [''],
      expectedConfirmationDate: ['']
    });

    // Enable/disable login fields based on checkbox
    this.employeeForm.get('allowLogin')?.valueChanges.subscribe(checked => {
      const roleTemplate = this.employeeForm.get('roleTemplate');
      const username = this.employeeForm.get('username');
      const password = this.employeeForm.get('password');
      const sendCredentials = this.employeeForm.get('sendCredentials');

      if (checked) {
        roleTemplate?.setValidators([Validators.required]);
        username?.setValidators([Validators.required]);
        password?.setValidators([Validators.required]);
      } else {
        roleTemplate?.clearValidators();
        username?.clearValidators();
        password?.clearValidators();
        sendCredentials?.setValue(false);
      }
      roleTemplate?.updateValueAndValidity();
      username?.updateValueAndValidity();
      password?.updateValueAndValidity();
    });
  }

  // Additonal Information 

   addEducation() {
    this.educations.push({
      degree: '',
      institution: '',
      year: '',
      major: ''
    });
  }

  removeEducation(index: number) {
    this.educations.splice(index, 1);
  }

  addWorkHistory() {
    this.workHistory.push({
      company: '',
      position: '',
      from: '',
      to: ''
    });
  }

  removeWorkHistory(index: number) {
    this.workHistory.splice(index, 1);
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.employeeForm.patchValue({ photo: file });
      this.employeeForm.get('photo')?.updateValueAndValidity();
      
      // File preview
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearPhoto(): void {
    this.photoPreview = null;
    this.employeeForm.patchValue({ photo: null });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Handle form submission
    }
  }

  onCancel(): void {
    // Handle cancel action
  }
}
