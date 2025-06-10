import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ResponseTimeService } from './response-time.service';

@Component({
    selector: 'app-response-time',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './response-time.component.html',
    styleUrl: './response-time.component.scss'
})
export class ResponseTimeComponent {

    constructor(
        private responseTimeService: ResponseTimeService
    ) {}

    ngOnInit(): void {
        this.responseTimeService.loadChart();
    }

}