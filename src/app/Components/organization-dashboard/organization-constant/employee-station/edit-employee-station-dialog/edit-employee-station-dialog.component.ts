import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { Observable } from 'rxjs';
import { EmployeeAreaService } from '../../../../../Services/Constants Services/employee-area.service';

@Component({
    selector: 'app-edit-employee-station-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule
    ],
    template: `
        <h2 mat-dialog-title>Edit Employee Station</h2>
        <mat-dialog-content>
            <mat-form-field appearance="fill" style="width: 100%;">
                <mat-label>Name</mat-label>
                <input matInput [(ngModel)]="data.name" required>
            </mat-form-field>

            <mat-form-field appearance="fill" class="mt-4" style="width: 100%;">
                <mat-label>Code</mat-label>
                <input matInput [(ngModel)]="data.code" required>
            </mat-form-field>

            <mat-form-field appearance="fill" class="mt-4" style="width: 100%;">
                <mat-label>Area</mat-label>
                <mat-select [(ngModel)]="data.areaId" required>
                    <mat-option *ngFor="let area of areas" [value]="area.id">{{ area.name }}</mat-option>
                </mat-select>
            </mat-form-field>

        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="onCancel()">Cancel</button>
            <button mat-flat-button color="primary" [disabled]="!data.name || !data.code || !data.areaId" (click)="onSave()">Save</button>
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
export class EditEmployeeStationDialogComponent implements OnInit {
    areas: { id: number; name: string }[] = [];

    constructor(
        public dialogRef: MatDialogRef<EditEmployeeStationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string; code: string; areaId: number; stationHeadId: number | null; hrManagerId: number | null; accountsManagerId: number | null },
        private areaService: EmployeeAreaService, // Replace with actual service
    ) {}

    ngOnInit() {
        // Fetch areas for dropdown
        this.areaService.getAllEmployeeBanks({ MaxResultCount: 1000 }).subscribe({
            next: (response) => {
                if (response.success) {
                    this.areas = response.result.items;
                }
            },
            error: (error) => console.error('Failed to load areas:', error)
        });

    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data);
    }
}