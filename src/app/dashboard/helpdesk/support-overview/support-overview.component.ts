import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SupportOverviewService } from './support-overview.service';

@Component({
    selector: 'app-support-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './support-overview.component.html',
    styleUrl: './support-overview.component.scss'
})
export class SupportOverviewComponent {

    constructor(
        private supportOverviewService: SupportOverviewService
    ) {}

    ngOnInit(): void {
        this.supportOverviewService.loadChart();
    }

}