import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogConfig, MatDialogContent, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-announcement-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule,
    MatButton
  ],
  templateUrl: './announcement-details.component.html',
  styleUrl: './announcement-details.component.scss'
})
export class AnnouncementDetailsComponent {
 constructor(
    public dialogRef: MatDialogRef<AnnouncementDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  formatList(items: any[]): string {
    return items?.map(item => item.name).join(', ') || 'None';
  }
}
