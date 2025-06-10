  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { ActivatedRoute } from '@angular/router';
  import { EmployeeService } from '../../../Services/employee.service';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { MatNativeDateModule } from '@angular/material/core';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { MatDividerModule } from '@angular/material/divider';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
  import { MatTabsModule } from '@angular/material/tabs';
  import { MatTooltipModule } from '@angular/material/tooltip';
  import { CommonModule } from '@angular/common';
  import { MatTableModule } from '@angular/material/table';

  

  @Component({
    selector: 'app-edit-employee',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatTabsModule,
      MatDividerModule,
      MatTooltipModule,
      CommonModule,
      MatTableModule
    ],
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
  })
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: number;
  displayedDocumentColumns: string[] = ['documentType', 'documentNumber', 'issueDate', 'expiryDate', 'actions'];
  documents: any[] = [];
  salaryBreakup = [
    { item: 'Basic', amount: 0 },
    { item: 'Allowance', amount: 0 }
  ];

  

  religions = [
    { id: 1, name: 'Islam' },
    { id: 2, name: 'Christianity' },
    { id: 3, name: 'Hinduism' },
    { id: 4, name: 'Other' }
  ];

  documentTypes = [
    { id: 1, name: 'Passport' },
    { id: 2, name: 'Visa' },
    { id: 3, name: 'Work Permit' },
    { id: 4, name: 'ID Card' },
    { id: 5, name: 'Degree' },
    { id: 6, name: 'Certification' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
        this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadEmployeeData();
    // this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    // this.initForm();

    // this.employeeService.getEmployeeById(this.employeeId).subscribe((employee) => {
    //   if (employee) {
    //     this.employeeForm.patchValue(employee);
    //     if (employee.documents) {
    //       this.documents = [...employee.documents];
    //     }
    //   }
    // });
  }

  initForm() {
    this.employeeForm = this.fb.group({
      // General Info
      name: ['', Validators.required],
      surname: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      mobileNo: [''],
      cnic: [''],
      passport: [''],
      dateOfBirth: [''],
      genderName: [''],
      genderId: [''],
      maritalStatusName: [''],
      maritalStatusId: [''],

      // Additional Info
      placeOfBirth: [''],
      familyCode: [''],
      religionId: [''],
      branchCode: [''],
      address: [''],
      state: [''],
      zipCode: [''],
      emergencyContactPerson: [''],
      emergencyRelationship: [''],
      emergencyContactPhone: [''],
      cnicIssuanceDate: [''],
      cnicExpiryDate: [''],
      eobiRegistrationNo: [''],
      eobiEntryDate: [''],
      socialSecurityNo: [''],
      visaNo: [''],
      visaExpiryDate: [''],

      // Company Info
      employeeCode: [''],
      employeePositionName: [''],
      designationName: [''],
      joiningDate: [''],
      confirmationDate: [''],
      employeeStatusName: [''],
      employeeStationName: [''],
      departmentName: [''],
      divisionName: [''],

      // Bank Info
      employeeBankName: [''],
      accountTitle: [''],
      accountNumber: [''],

      // Salary Info
      monthlySalary: [''],
      hourlySalary: [''],
      dailySalary: [''],
      currency: [''],
      monthlyGrossSalary: [''],
      annualGrossSalary: [''],
    });
  }

  //  loadEmployeeData() {
  //   this.employeeService.getEmployeeById(this.employeeId).subscribe({
  //     next: (employee) => {
  //       if (employee) {
  //         // Format date fields before patching
  //         const formattedEmployee = this.formatEmployeeData(employee);
  //         this.employeeForm.patchValue(formattedEmployee);
          
  //         // Load documents if they exist
  //         if (employee.documents) {
  //           this.documents = employee.documents.map((doc: { issueDate: string | number | Date; expiryDate: string | number | Date; }) => ({
  //             ...doc,
  //             issueDate: doc.issueDate ? new Date(doc.issueDate) : null,
  //             expiryDate: doc.expiryDate ? new Date(doc.expiryDate) : null
  //           }));
  //         }
          
  //         // Load salary breakup if it exists
  //         if (employee.salaryBreakup) {
  //           this.salaryBreakup = [...employee.salaryBreakup];
  //         }
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error loading employee data:', err);
  //       // Handle error (show message, etc.)
  //     }
  //   });
  // }
  loadEmployeeData() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (response) => {
        if (response && response) {
          const employee = response;
          
          // Map the API response to your form structure
          const formData = {
            // General Info
            name: employee.name,
            surname: employee.surname,
            emailAddress: employee.emailAddress,
            mobileNo: employee.mobileNo,
            cnic: employee.cnic,
            passport: employee.passport,
            dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth) : null,
            genderName: employee.genderName,
            genderId: employee.genderId,
            maritalStatusName: employee.maritalStatusName,
            maritalStatusId: employee.maritalStatusId,

            // Additional Info
            placeOfBirth: employee.placeOfBirth,
            familyCode: employee.familyCode,
            religionId: employee.religionId,
            branchCode: employee.branchCode,
            address: employee.address,
            state: employee.state,
            zipCode: employee.zipCode,
            emergencyContactPerson: employee.emergencyContactPerson,
            emergencyRelationship: employee.relationship,
            emergencyContactPhone: employee.mobilePhone,
            cnicIssuanceDate: employee.cnicIssuanceDate ? new Date(employee.cnicIssuanceDate) : null,
            cnicExpiryDate: employee.cnicExpiryDate ? new Date(employee.cnicExpiryDate) : null,
            eobiRegistrationNo: employee.eobiRegistrationNo,
            eobiEntryDate: employee.eobiEntryDate ? new Date(employee.eobiEntryDate) : null,
            socialSecurityNo: employee.socialSecurityNumber,
            visaNo: employee.visa,
            visaExpiryDate: employee.visaExpiryDate ? new Date(employee.visaExpiryDate) : null,

            // Company Info
            employeeCode: employee.employeeCode,
            employeePositionName: employee.employeePositionName,
            designationName: employee.designationName,
            joiningDate: employee.joiningDate ? new Date(employee.joiningDate) : null,
            confirmationDate: employee.confirmationDate ? new Date(employee.confirmationDate) : null,
            employeeStatusName: employee.employeeStatusName,
            employeeStationName: employee.employeeStationName,
            departmentName: employee.departmentName,
            divisionName: employee.divisionName,

            // Bank Info
            employeeBankName: employee.employeeBankName,
            accountTitle: employee.accountTitle,
            accountNumber: employee.accountNumber,

            // Salary Info - You'll need to add these to your API response if needed
            monthlySalary: '',
            hourlySalary: '',
            dailySalary: '',
            currency: '',
            monthlyGrossSalary: '',
            annualGrossSalary: '',
          };

          this.employeeForm.patchValue(formData);
          
          // Load documents if they exist (assuming they come from a different endpoint)
          // You might need to call a separate service to get documents
          // this.loadEmployeeDocuments();
        }
      },
      error: (err) => {
        console.error('Error loading employee data:', err);
        // Handle error (show message, etc.)
      }
    });
  }
  formatEmployeeData(employee: any): any {
    // Format date fields to be compatible with mat-datepicker
    const dateFields = [
      'dateOfBirth', 'cnicIssuanceDate', 'cnicExpiryDate',
      'eobiEntryDate', 'visaExpiryDate', 'joiningDate',
      'confirmationDate'
    ];
    
    const formattedEmployee = { ...employee };
    
    dateFields.forEach(field => {
      if (formattedEmployee[field]) {
        formattedEmployee[field] = new Date(formattedEmployee[field]);
      }
    });
    
    return formattedEmployee;
  }

  addDocumentLine() {
    this.documents.push({
      documentTypeId: null,
      documentNumber: '',
      issueDate: null,
      expiryDate: null,
      file: null
    });
  }

  removeDocumentLine(index: number) {
    this.documents.splice(index, 1);
  }

  onFileSelect(event: any, document: any) {
    const file = event.target.files[0];
    if (file) {
      document.file = file;
      document.fileName = file.name;
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = new FormData();
      
      // Append all form values
      Object.keys(this.employeeForm.value).forEach(key => {
        const value = this.employeeForm.value[key];
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      // Append documents
      this.documents.forEach((doc, index) => {
        formData.append(`documents[${index}].documentTypeId`, doc.documentTypeId);
        formData.append(`documents[${index}].documentNumber`, doc.documentNumber);
        formData.append(`documents[${index}].issueDate`, doc.issueDate);
        formData.append(`documents[${index}].expiryDate`, doc.expiryDate);
        if (doc.file) {
          formData.append(`documents[${index}].file`, doc.file);
        }
      });

      // Append salary breakup
      this.salaryBreakup.forEach((item, index) => {
        formData.append(`salaryBreakup[${index}].item`, item.item);
        formData.append(`salaryBreakup[${index}].amount`, item.amount.toString());
      });

      this.employeeService.updateEmployee(this.employeeId, formData).subscribe({
        next: () => {
          alert('Employee updated successfully!');
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Error updating employee. Please try again.');
        }
      });
    }
  }
}
