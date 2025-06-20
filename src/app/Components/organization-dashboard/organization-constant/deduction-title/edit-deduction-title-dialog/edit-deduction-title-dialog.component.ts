import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-edit-deduction-title-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule
    ],
    template: `
        <h2 mat-dialog-title>Edit Deduction Title</h2>
        <mat-dialog-content>
            <mat-form-field appearance="fill" style="width: 100%;">
                <mat-label>Name</mat-label>
                <input matInput [(ngModel)]="data.name" required>
            </mat-form-field>

            <mat-checkbox [(ngModel)]="data.isAmount" class="mt-4">
                Is Amount
            </mat-checkbox>

            <mat-form-field appearance="fill" class="mt-4" style="width: 100%;">
                <mat-label>Deduction Type</mat-label>
                <mat-select [(ngModel)]="data.deductionType" required>
                    <mat-option [value]="0">General</mat-option>
                    <mat-option [value]="1">Tax</mat-option>
                    <mat-option [value]="2">Social Security</mat-option>
                </mat-select>
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="onCancel()">Cancel</button>
            <button mat-flat-button color="primary" [disabled]="!data.name || data.deductionType == null" (click)="onSave()">Save</button>
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
export class EditDeductionTitleDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<EditDeductionTitleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string; isAmount: boolean; deductionType: number }
    ) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}