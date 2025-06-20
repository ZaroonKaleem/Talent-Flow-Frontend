import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee-status-dialog',
  standalone: true,
  imports: [
      CommonModule,
        MatDialogModule,
        MatButtonModule
  ],
  templateUrl: './delete-employee-status-dialog.component.html',
})
export class DeleteEmployeeStatusDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
