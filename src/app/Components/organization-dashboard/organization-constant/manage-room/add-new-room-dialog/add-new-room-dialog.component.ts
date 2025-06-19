import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoomService } from '../../../../../Services/Constants Services/employee-room.service';

@Component({
  selector: 'app-add-new-room-dialog',
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
  templateUrl: './add-new-room-dialog.component.html',
  styleUrls: ['./add-new-room-dialog.component.scss']
})
export class AddNewRoomDialogComponent {
  roomForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewRoomDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private roomService: EmployeeRoomService
  ) {
    this.roomForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.roomForm.valid) {
      const roomData = {
        id: this.roomForm.value.id,
        name: this.roomForm.value.name
      };

      this.roomService.createRoom(roomData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Room created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create Room', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error creating Room:', error);
        }
      });
    }
  }
}