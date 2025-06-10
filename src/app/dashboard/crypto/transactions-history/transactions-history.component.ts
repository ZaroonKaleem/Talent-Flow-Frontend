import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-transactions-history',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf],
    templateUrl: './transactions-history.component.html',
    styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['coin', 'date', 'amount', 'price', 'type', 'total_value'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    coin: any;
    date: string;
    amount: string;
    price: string;
    type: any;
    total_value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        coin: {
            img: 'images/cryptocurrencies/bitcoin.svg',
            name: 'Bitcoin',
            abbreviation: 'BTC'
        },
        date: '2024-09-10',
        amount: '0.50 BTC',
        price: '$27,500',
        type: {
            buy: true,
            sell: false
        },
        total_value: '$13,500'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/ethereum.svg',
            name: 'Ethereum',
            abbreviation: 'ETH'
        },
        date: '2024-09-08',
        amount: '5.00 ETH',
        price: '$1,750',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$8,750'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/binance.svg',
            name: 'Binance',
            abbreviation: 'BNB'
        },
        date: '2024-09-05',
        amount: '100 SOL',
        price: '$250',
        type: {
            buy: true,
            sell: false
        },
        total_value: '$3,500'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/tether.svg',
            name: 'Tether',
            abbreviation: 'USDT'
        },
        date: '2024-08-30',
        amount: '10 BNB',
        price: '$1.00',
        type: {
            buy: true,
            sell: false
        },
        total_value: '$2,500'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/xrp.svg',
            name: 'XRP',
            abbreviation: 'XRP'
        },
        date: '2024-08-25',
        amount: '1,000 ADA',
        price: '$0.50',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$250'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/solana.svg',
            name: 'Solana',
            abbreviation: 'SOL'
        },
        date: '2024-08-20',
        amount: '0.40 BTC',
        price: '$35',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$11,800'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/usdc.png',
            name: 'USDC',
            abbreviation: 'USDC'
        },
        date: '2024-08-15',
        amount: '3.00 USDC',
        price: '$0.9999',
        type: {
            buy: true,
            sell: false
        },
        total_value: '$5,400'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/dogecoin.png',
            name: 'Dogecoin',
            abbreviation: 'DOGE'
        },
        date: '2024-08-14',
        amount: '3.00 DOGE',
        price: '$0,1221',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$254'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/toncoin.png',
            name: 'Toncoin',
            abbreviation: 'TON'
        },
        date: '2024-08-10',
        amount: '3.00 TON',
        price: '$5.82',
        type: {
            buy: true,
            sell: false
        },
        total_value: '$1,253'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/cardano.png',
            name: 'Cardano',
            abbreviation: 'ADA'
        },
        date: '2024-08-08',
        amount: '3.00 ADA',
        price: '$0,3884',
        type: {
            buy: true,
            sell: false
        },
        total_value: '$4,432'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/tron.png',
            name: 'TRON',
            abbreviation: 'TRX'
        },
        date: '2024-08-07',
        amount: '10.00 TRX',
        price: '$0.1554',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$5,435'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/avalanche.png',
            name: 'Avalanche',
            abbreviation: 'AVAX'
        },
        date: '2024-08-02',
        amount: '43.22 AVAX',
        price: '$28.77',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$134'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/shiba-inu.png',
            name: 'Shiba Inu',
            abbreviation: 'SHIB'
        },
        date: '2024-07-25',
        amount: '43.23 SHIB',
        price: '$0.1554',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$4,342'
    },
    {
        coin: {
            img: 'images/cryptocurrencies/chainlink.png',
            name: 'Chainlink',
            abbreviation: 'LINK'
        },
        date: '2024-08-01',
        amount: '54.23 LINK',
        price: '$28.77',
        type: {
            buy: false,
            sell: true
        },
        total_value: '$5,302'
    }
];