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
    selector: 'app-rankings',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf],
    templateUrl: './rankings.component.html',
    styleUrl: './rankings.component.scss'
})
export class RankingsComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    displayedColumns: string[] = ['rank', 'cryptocurrency', 'market_cap', 'price', 'change_24h', 'change_7d', 'value_24h', 'circulating_supply'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    rank: number;
    cryptocurrency: any;
    market_cap: string;
    price: string;
    change_24h: any;
    change_7d: any;
    value_24h: string;
    circulating_supply: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        rank: 1,
        cryptocurrency: {
            img: 'images/cryptocurrencies/bitcoin.svg',
            name: 'Bitcoin',
            abbreviation: 'BTC'
        },
        market_cap: '$520B',
        price: '$27,500',
        change_24h: {
            number: '+2.3%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+10.2%',
            up: true,
            down: false
        },
        value_24h: '$35B',
        circulating_supply: '19M BTC'
    },
    {
        rank: 2,
        cryptocurrency: {
            img: 'images/cryptocurrencies/ethereum.svg',
            name: 'Ethereum',
            abbreviation: 'ETH'
        },
        market_cap: '$210B',
        price: '$1,750',
        change_24h: {
            number: '-1.2%',
            up: false,
            down: true
        },
        change_7d: {
            number: '+6.3%',
            up: true,
            down: false
        },
        value_24h: '$20B',
        circulating_supply: '120M ETH'
    },
    {
        rank: 3,
        cryptocurrency: {
            img: 'images/cryptocurrencies/binance.svg',
            name: 'Binance',
            abbreviation: 'BNB'
        },
        market_cap: '$40B',
        price: '$250',
        change_24h: {
            number: '+1.5%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+7.8%',
            up: true,
            down: false
        },
        value_24h: '$1.8B',
        circulating_supply: '160M BNB'
    },
    {
        rank: 4,
        cryptocurrency: {
            img: 'images/cryptocurrencies/tether.svg',
            name: 'Tether',
            abbreviation: 'USDT'
        },
        market_cap: '$83B',
        price: '$1.00',
        change_24h: {
            number: '+0.01%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+0.02%',
            up: true,
            down: false
        },
        value_24h: '$45B',
        circulating_supply: '83B USDT'
    },
    {
        rank: 5,
        cryptocurrency: {
            img: 'images/cryptocurrencies/xrp.svg',
            name: 'XRP',
            abbreviation: 'XRP'
        },
        market_cap: '$25B',
        price: '$0.50',
        change_24h: {
            number: '+0.9%',
            up: true,
            down: false
        },
        change_7d: {
            number: '-8.6%',
            up: false,
            down: true
        },
        value_24h: '$2.2B',
        circulating_supply: '50B XRP'
    },
    {
        rank: 6,
        cryptocurrency: {
            img: 'images/cryptocurrencies/solana.svg',
            name: 'Solana',
            abbreviation: 'SOL'
        },
        market_cap: '$12B',
        price: '$35',
        change_24h: {
            number: '+5.8%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+15.5%',
            up: true,
            down: false
        },
        value_24h: '$3.5B',
        circulating_supply: '400M SOL'
    },
    {
        rank: 7,
        cryptocurrency: {
            img: 'images/cryptocurrencies/usdc.png',
            name: 'USDC',
            abbreviation: 'USDC'
        },
        market_cap: '$36B',
        price: '$0.9999',
        change_24h: {
            number: '+0.01%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+0.02%',
            up: true,
            down: false
        },
        value_24h: '$4B',
        circulating_supply: '36 USDC'
    },
    {
        rank: 8,
        cryptocurrency: {
            img: 'images/cryptocurrencies/dogecoin.png',
            name: 'Dogecoin',
            abbreviation: 'DOGE'
        },
        market_cap: '$17B',
        price: '$0,1221',
        change_24h: {
            number: '-0.56%',
            up: false,
            down: true
        },
        change_7d: {
            number: '-3.57%',
            up: false,
            down: true
        },
        value_24h: '$85B',
        circulating_supply: '146M DOGE'
    },
    {
        rank: 9,
        cryptocurrency: {
            img: 'images/cryptocurrencies/toncoin.png',
            name: 'Toncoin',
            abbreviation: 'TON'
        },
        market_cap: '$14B',
        price: '$5.82',
        change_24h: {
            number: '+0.13%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+0.88%',
            up: true,
            down: false
        },
        value_24h: '$21B',
        circulating_supply: '25M TON'
    },
    {
        rank: 10,
        cryptocurrency: {
            img: 'images/cryptocurrencies/cardano.png',
            name: 'Cardano',
            abbreviation: 'ADA'
        },
        market_cap: '$13B',
        price: '$0,3884',
        change_24h: {
            number: '-0.59%',
            up: false,
            down: true
        },
        change_7d: {
            number: '-1.80%',
            up: false,
            down: true
        },
        value_24h: '$32B',
        circulating_supply: '86M ADA'
    },
    {
        rank: 11,
        cryptocurrency: {
            img: 'images/cryptocurrencies/tron.png',
            name: 'TRON',
            abbreviation: 'TRX'
        },
        market_cap: '$130B',
        price: '$0.1554',
        change_24h: {
            number: '+0.17%',
            up: true,
            down: false
        },
        change_7d: {
            number: '+0.02%',
            up: true,
            down: false
        },
        value_24h: '$33B',
        circulating_supply: '86M TRX'
    },
    {
        rank: 12,
        cryptocurrency: {
            img: 'images/cryptocurrencies/avalanche.png',
            name: 'Avalanche',
            abbreviation: 'AVAX'
        },
        market_cap: '$11B',
        price: '$28.77',
        change_24h: {
            number: '-0.08%',
            up: false,
            down: true
        },
        change_7d: {
            number: '+0.51%',
            up: true,
            down: false
        },
        value_24h: '$32B',
        circulating_supply: '40M AVAX'
    }
];