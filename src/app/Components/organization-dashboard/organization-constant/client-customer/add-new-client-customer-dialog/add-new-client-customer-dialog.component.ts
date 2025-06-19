import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from 'ngx-editor';
import { EmployeeGroupService } from '../../../../../Services/Constants Services/employee-group-service.service';
import { AddNewEmployeeGroupDialogComponent } from '../../employee-group/add-new-employee-group-dialog/add-new-employee-group-dialog.component';
import { ClientCustomerComponent } from '../client-customer.component';
import { ClientCustomerService } from '../../../../../Services/Constants Services/client-customer.service';

@Component({
  selector: 'app-add-new-client-customer-dialog',
  standalone: true,
  imports: [
     CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
  ],
  templateUrl: './add-new-client-customer-dialog.component.html',
  styleUrl: './add-new-client-customer-dialog.component.scss'
})
export class AddNewClientCustomerDialogComponent {
 clientCustomerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployeeGroupDialogComponent>,
    private fb: FormBuilder,
    private employeeClientCustomerService: ClientCustomerService,
    private snackBar: MatSnackBar

  ) {
    this.clientCustomerForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.clientCustomerForm.valid) {
      const employeeGroup = this.clientCustomerForm.value;
      this.employeeClientCustomerService.createClientCustomer(employeeGroup).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Employee group created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['show']
          });
        },
        error: (error) => {
          this.dialogRef.close();
          this.snackBar.open('Failed to create employee group.', 'Close', {
            duration: 3000,
            panelClass: ['hide']
          });
          console.error('Error creating employee group:', error);
        }
      });
    }
  }
}