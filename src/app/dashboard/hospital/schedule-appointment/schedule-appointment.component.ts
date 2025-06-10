import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-schedule-appointment',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './schedule-appointment.component.html',
    styleUrl: './schedule-appointment.component.scss'
})
export class ScheduleAppointmentComponent {}