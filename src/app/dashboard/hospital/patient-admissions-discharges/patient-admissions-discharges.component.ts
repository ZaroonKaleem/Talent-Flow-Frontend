import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { PatientAdmissionsDischargesService } from './patient-admissions-discharges.service';

@Component({
    selector: 'app-patient-admissions-discharges',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './patient-admissions-discharges.component.html',
    styleUrl: './patient-admissions-discharges.component.scss'
})
export class PatientAdmissionsDischargesComponent {

    constructor(
        private patientAdmissionsDischargesService: PatientAdmissionsDischargesService
    ) {}

    ngOnInit(): void {
        this.patientAdmissionsDischargesService.loadChart();
    }

}