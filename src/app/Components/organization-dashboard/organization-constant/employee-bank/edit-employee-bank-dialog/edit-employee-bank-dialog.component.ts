import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-employee-bank-dialog',
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
        <h2 mat-dialog-title>Edit Employee Bank</h2>
        <mat-dialog-content>
            <mat-form-field appearance="fill" style="width: 100%;">
                <mat-label>Name</mat-label>
                <input matInput [(ngModel)]="data.name" required>
            </mat-form-field>

            <mat-form-field appearance="fill" class="mt-4" style="width: 100%;">
                <mat-label>Code</mat-label>
                <input matInput [(ngModel)]="data.code" required>
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="onCancel()">Cancel</button>
            <button mat-flat-button color="primary" [disabled]="!data.name || !data.code" (click)="onSave()">Save</button>
        </mat-dialog-actions>
    `,
    styles: [`
        mat-dialog-content {
            padding: 20px;
            display: flex;
            flex-direction: column;
        }
        mat-dialog-actions {
            justify-content: flex-end;
            padding: 10px 20px;
        }
        .mt-4 {
            margin-top: 16px;
        }
    `]
})
export class EditEmployeeBankDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<EditEmployeeBankDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string; code: string }
    ) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}