import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee-prefix-dialog',
  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],

  templateUrl: './delete-employee-prefix-dialog.component.html',
  styleUrl: './delete-employee-prefix-dialog.component.scss'
})
export class DeleteEmployeePrefixDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<DeleteEmployeePrefixDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}