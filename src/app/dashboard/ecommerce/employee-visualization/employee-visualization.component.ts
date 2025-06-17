import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-visualization',
  standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule, MatPaginatorModule, NgClass],
  templateUrl: './employee-visualization.component.html',
  styleUrl: './employee-visualization.component.scss'
})
export class EmployeeVisualizationComponent {

    displayedColumns: string[] = ['product', 'price', 'order', 'stock', 'amount'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    product: any;
    price: string;
    order: number;
    stock: any;
    amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {
    //     product: {
    //         img: 'images/products/product1.jpg',
    //         title: 'Smart Band',
    //         date: '08 Jun 2024'
    //     },
    //     price: '$35.00',
    //     order: 75,
    //     stock: {
    //         count: '750',
    //         className: false
    //     },
    //     amount: '$2,625'
    // },
    // {
    //     product: {
    //         img: 'images/products/product2.jpg',
    //         title: 'Headphone',
    //         date: '07 Jun 2024'
    //     },
    //     price: '$49.00',
    //     order: 25,
    //     stock: {
    //         count: '825',
    //         className: false
    //     },
    //     amount: '$1,225'
    // },
    // {
    //     product: {
    //         img: 'images/products/product3.jpg',
    //         title: 'iPhone 15 Plus',
    //         date: '06 Jun 2024'
    //     },
    //     price: '$99.00',
    //     order: 55,
    //     stock: {
    //         count: 'Stock Out',
    //         className: true
    //     },
    //     amount: '$5,445'
    // },
    // {
    //     product: {
    //         img: 'images/products/product4.jpg',
    //         title: 'Bluetooth Speaker',
    //         date: '05 Jun 2024'
    //     },
    //     price: '$59.00',
    //     order: 40,
    //     stock: {
    //         count: '535',
    //         className: false
    //     },
    //     amount: '$2,360'
    // },
    // {
    //     product: {
    //         img: 'images/products/product5.jpg',
    //         title: 'Airbuds 2nd Gen',
    //         date: '04 Jun 2024'
    //     },
    //     price: '$79.00',
    //     order: 56,
    //     stock: {
    //         count: '460',
    //         className: false
    //     },
    //     amount: '$4,424'
    // },
    // {
    //     product: {
    //         img: 'images/products/product2.jpg',
    //         title: 'Headphone',
    //         date: '07 Jun 2024'
    //     },
    //     price: '$49.00',
    //     order: 25,
    //     stock: {
    //         count: '825',
    //         className: false
    //     },
    //     amount: '$1,225'
    // },
    // {
    //     product: {
    //         img: 'images/products/product4.jpg',
    //         title: 'Bluetooth Speaker',
    //         date: '05 Jun 2024'
    //     },
    //     price: '$59.00',
    //     order: 40,
    //     stock: {
    //         count: '535',
    //         className: false
    //     },
    //     amount: '$2,360'
    // },
    // {
    //     product: {
    //         img: 'images/products/product1.jpg',
    //         title: 'Smart Band',
    //         date: '08 Jun 2024'
    //     },
    //     price: '$35.00',
    //     order: 75,
    //     stock: {
    //         count: '750',
    //         className: false
    //     },
    //     amount: '$2,625'
    // },
    // {
    //     product: {
    //         img: 'images/products/product5.jpg',
    //         title: 'Airbuds 2nd Gen',
    //         date: '04 Jun 2024'
    //     },
    //     price: '$79.00',
    //     order: 56,
    //     stock: {
    //         count: '460',
    //         className: false
    //     },
    //     amount: '$4,424'
    // },
    // {
    //     product: {
    //         img: 'images/products/product3.jpg',
    //         title: 'iPhone 15 Plus',
    //         date: '06 Jun 2024'
    //     },
    //     price: '$99.00',
    //     order: 55,
    //     stock: {
    //         count: 'Stock Out',
    //         className: true
    //     },
    //     amount: '$5,445'
    // }
];