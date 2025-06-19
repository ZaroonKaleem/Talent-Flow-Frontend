import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee-group-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-employee-group-dialog.component.html'
})
export class DeleteEmployeeGroupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}