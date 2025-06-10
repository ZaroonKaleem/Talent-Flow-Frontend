import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDatepickerApply } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-view-modal',
  standalone: true,
  imports: [MatDialogModule,MatButton, CommonModule],
  templateUrl: './employee-view-modal.component.html',
  styleUrl: './employee-view-modal.component.scss'
})
export class EmployeeViewModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
