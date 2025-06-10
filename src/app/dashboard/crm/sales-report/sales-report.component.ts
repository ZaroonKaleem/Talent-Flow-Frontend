import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SalesReportService } from './sales-report.service';

@Component({
    selector: 'app-sales-report',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './sales-report.component.html',
    styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent {

    constructor(
        private salesReportService: SalesReportService
    ) {}

    ngOnInit(): void {
        this.salesReportService.loadChart();
    }

}