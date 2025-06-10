import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { BedOccupancyRateService } from './bed-occupancy-rate.service';

@Component({
    selector: 'app-bed-occupancy-rate',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule],
    templateUrl: './bed-occupancy-rate.component.html',
    styleUrl: './bed-occupancy-rate.component.scss'
})
export class BedOccupancyRateComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private bedOccupancyRateService: BedOccupancyRateService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.bedOccupancyRateService.loadChart();
    }

}