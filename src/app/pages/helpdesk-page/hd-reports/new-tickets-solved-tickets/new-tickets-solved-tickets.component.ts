import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NewTicketsSolvedTicketsService } from './new-tickets-solved-tickets.service';

@Component({
    selector: 'app-new-tickets-solved-tickets',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './new-tickets-solved-tickets.component.html',
    styleUrl: './new-tickets-solved-tickets.component.scss'
})
export class NewTicketsSolvedTicketsComponent {

    constructor(
        private newTicketsSolvedTicketsService: NewTicketsSolvedTicketsService
    ) {}

    ngOnInit(): void {
        this.newTicketsSolvedTicketsService.loadChart();
    }

}