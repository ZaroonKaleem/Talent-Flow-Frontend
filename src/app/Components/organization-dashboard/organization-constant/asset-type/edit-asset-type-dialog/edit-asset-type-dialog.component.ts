import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-asset-type-dialog',
  standalone: true,
  imports: [
       CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule
  ],
  template: `
        <h2 mat-dialog-title>Edit Employee Group</h2>
        <mat-dialog-content>
            <mat-form-field appearance="fill" style="width: 100%;">
                <mat-label>Name</mat-label>
                <input matInput [(ngModel)]="data.name" required>
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="onCancel()">Cancel</button>
            <button mat-flat-button color="primary" [disabled]="!data.name" (click)="onSave()">Save</button>
        </mat-dialog-actions>
    `,
    styles: [`
        mat-dialog-content {
            padding: 20px;
        }
        mat-dialog-actions {
            justify-content: flex-end;
            padding: 10px 20px;
        }
    `]
})
export class EditAssetTypeDialogComponent {
 constructor(
        public dialogRef: MatDialogRef<EditAssetTypeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
    ) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}