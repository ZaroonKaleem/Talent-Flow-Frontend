import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TotalOrdersService } from './total-orders.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-total-orders',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
    templateUrl: './total-orders.component.html',
    styleUrl: './total-orders.component.scss'
})
export class TotalOrdersComponent {

      markAttendance() {
    console.log('Sign In clicked');
    // Handle your attendance logic here
  }

  refresh() {
    console.log('Refresh clicked');
    // Handle refresh logic here
  }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private totalOrdersService: TotalOrdersService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.totalOrdersService.loadChart();
    }

}