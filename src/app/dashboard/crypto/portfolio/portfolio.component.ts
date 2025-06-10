import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['coin', 'amount', 'total_value'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    coin: any;
    amount: string;
    total_value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        coin: {
            name: 'Bitcoin',
            abbreviation: 'BTC'
        },
        amount: '0.50 BTC',
        total_value: '$13,500'
    },
    {
        coin: {
            name: 'Ethereum',
            abbreviation: 'ETH'
        },
        amount: '5.00 ETH',
        total_value: '$8,750'
    },
    {
        coin: {
            name: 'Binance',
            abbreviation: 'BNB'
        },
        amount: '100 SOL',
        total_value: '$3,500'
    },
    {
        coin: {
            name: 'Tether',
            abbreviation: 'USDT'
        },
        amount: '10 BNB',
        total_value: '$2,500'
    },
    {
        coin: {
            name: 'XRP',
            abbreviation: 'XRP'
        },
        amount: '1,000 ADA',
        total_value: '$250'
    }
];