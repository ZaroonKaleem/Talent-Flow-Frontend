import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDocumentTypeService } from '../../../../../Services/Constants Services/employee-document-type.service';

@Component({
  selector: 'app-add-new-document-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './add-new-document-type-dialog.component.html',
  styleUrls: ['./add-new-document-type-dialog.component.scss']
})
export class AddNewDocumentTypeDialogComponent {
  documentTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewDocumentTypeDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private documentTypeService: EmployeeDocumentTypeService
  ) {
    this.documentTypeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.documentTypeForm.valid) {
      const documentTypeData = {
        id: this.documentTypeForm.value.id,
        name: this.documentTypeForm.value.name
      };

      this.documentTypeService.createDocumentType(documentTypeData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Document Type created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Document Type', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Document Type:', error);
        }
      });
    }
  }
}